from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ---------- Config ----------
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALG = 'HS256'
JWT_EXPIRY_DAYS = 7
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@example.com').lower()
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="Revanth Varma Portfolio API")

_cors_raw = os.environ.get('CORS_ORIGINS', '*')
_cors_origins = [o.strip() for o in _cors_raw.split(',') if o.strip()]
_allow_credentials = '*' not in _cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_credentials=_allow_credentials,
    allow_origins=_cors_origins or ['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)


# ---------- Auth helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False


def create_token(user_id: str, email: str) -> str:
    payload = {
        'sub': user_id,
        'email': email,
        'iat': datetime.now(timezone.utc),
        'exp': datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRY_DAYS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


async def get_current_admin(
    request: Request,
    creds: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> dict:
    token: Optional[str] = None
    if creds and creds.scheme.lower() == 'bearer':
        token = creds.credentials
    if not token:
        auth = request.headers.get('Authorization', '')
        if auth.lower().startswith('bearer '):
            token = auth.split(None, 1)[1].strip()
    if not token:
        raise HTTPException(status_code=401, detail='Not authenticated')
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')
    user = await db.users.find_one({'id': payload.get('sub')}, {'_id': 0, 'password_hash': 0})
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user


# ---------- Models ----------
class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class AdminUser(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: str = 'admin'


class TokenOut(BaseModel):
    token: str
    user: AdminUser


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra='ignore')
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


# Portfolio sub-models
class ProfileModel(BaseModel):
    name: str
    title: str
    tagline: str
    college: str
    summary: str
    email: EmailStr
    phone: Optional[str] = None
    linkedin: str
    github: str
    resume_url: str
    availability: str = 'ai/ml · devrel'
    initial: Optional[str] = None  # 1-char logo letter


class SkillGroupModel(BaseModel):
    key: str
    group: str
    items: List[str] = Field(default_factory=list)


class MetricModel(BaseModel):
    label: str
    value: str


class ProjectModel(BaseModel):
    id: str = Field(default_factory=lambda: f"project_{uuid.uuid4().hex[:6]}")
    title: str
    subtitle: str = ''
    description: str = ''
    category: str = 'AI / ML'  # display label
    categoryKey: Literal['aiml', 'llm', 'other'] = 'aiml'
    tech: List[str] = Field(default_factory=list)
    metrics: List[MetricModel] = Field(default_factory=list)
    link: str = ''
    demo_url: str = ''


class ExperienceModel(BaseModel):
    id: str = Field(default_factory=lambda: f"exp_{uuid.uuid4().hex[:6]}")
    status: str = ''
    title: str
    org: str = ''
    description: str = ''
    kind: Literal['education', 'work', 'project'] = 'education'


class PortfolioModel(BaseModel):
    profile: ProfileModel
    skills: List[SkillGroupModel]
    projects: List[ProjectModel]
    experience: List[ExperienceModel]


# ---------- Default Portfolio ----------
DEFAULT_PORTFOLIO = {
    'profile': {
        'name': 'Vejandla Revanth Varma',
        'title': 'AI & ML Engineer · Developer Relations',
        'tagline': 'Building Sovereign AI at population scale',
        'college': 'Osmania University',
        'summary': (
            'Final-year B.E. student in Computer Science (AI & ML), specialized in '
            'building high-performance Python-based AI pipelines and LLM-powered '
            'applications. Passionate about translating complex technical systems '
            'into accessible developer tools, tutorials, and documentation.'
        ),
        'email': 'vrevanth2004@gmail.com',
        'phone': '+91 85200 87605',
        'linkedin': 'https://linkedin.com/in/vrevanthvarma',
        'github': 'https://github.com/vrevanthvarma',
        'resume_url': 'https://customer-assets.emergentagent.com/job_3bf2e9d1-2049-4dee-8872-f47d5943740e/artifacts/4yd2u0in_Revanth_Varma_Sarvam_Resume.pdf',
        'availability': 'ai/ml · devrel',
        'initial': 'V',
    },
    'skills': [
        {'key': 'languages', 'group': 'Languages', 'items': ['Python', 'SQL', 'JavaScript', 'TypeScript']},
        {'key': 'frameworks', 'group': 'Frameworks & Libraries', 'items': ['FastAPI', 'React', 'TensorFlow', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'MediaPipe', 'OpenCV']},
        {'key': 'tools', 'group': 'Cloud & Tools', 'items': ['Git', 'GitHub', 'Jupyter Notebook', 'Postman', 'SQLite', 'FAISS', 'mBERT', 'LLM APIs']},
        {'key': 'devrel', 'group': 'DevRel', 'items': ['Technical Writing', 'API Documentation', 'Developer Tutorials', 'Interactive Demos']},
    ],
    'projects': [
        {
            'id': 'project_01',
            'category': 'AI / ML', 'categoryKey': 'aiml',
            'title': 'AI-Powered Sports Talent Assessment Platform',
            'subtitle': 'Real-time pose inference at the edge',
            'description': 'An async Python pipeline that ingests live video, runs MediaPipe + OpenCV pose inference, counts repetitions, and flags anomalous patterns in real time — exposed through a FastAPI service.',
            'metrics': [
                {'label': 'Throughput', 'value': '24+ FPS'},
                {'label': 'Rep Accuracy', 'value': '90%'},
                {'label': 'Fraud Reduction', 'value': '~85%'},
            ],
            'tech': ['Python', 'FastAPI', 'MediaPipe', 'OpenCV', 'SQLite', 'Async'],
            'link': 'https://github.com/vrevanthvarma',
            'demo_url': '',
        },
        {
            'id': 'project_02',
            'category': 'LLM · DevRel', 'categoryKey': 'llm',
            'title': 'LLM-Powered Natural Language to SQL Engine',
            'subtitle': 'Schema-aware NL→SQL with sub-3s latency',
            'description': 'A retrieval-augmented NL→SQL service: schema-aware prompting, LLM call, validation, then execution against a sandboxed database. Shipped with a React UI and full developer documentation.',
            'metrics': [
                {'label': 'Time Saved', 'value': '~70%'},
                {'label': 'Query Types', 'value': '15+'},
                {'label': 'Latency', 'value': '< 3s'},
            ],
            'tech': ['Python', 'FastAPI', 'LLM APIs', 'NLP', 'React', 'SQL'],
            'link': 'https://github.com/vrevanthvarma',
            'demo_url': '',
        },
        {
            'id': 'project_03',
            'category': 'LLM · DevRel', 'categoryKey': 'llm',
            'title': 'RAG-Powered Developer Documentation Assistant',
            'subtitle': 'Semantic search over multi-repo SDK docs',
            'description': 'An on-device retrieval-augmented chat assistant indexing SDK docs across repositories using FAISS + mBERT embeddings. Built as a portable DevRel tool that answers integration questions with citations.',
            'metrics': [
                {'label': 'Answer Accuracy', 'value': '94.2%'},
                {'label': 'Avg Latency', 'value': '1.2s'},
                {'label': 'Indexed Pages', 'value': '12k+'},
            ],
            'tech': ['Python', 'FAISS', 'mBERT', 'FastAPI', 'React'],
            'link': 'https://github.com/vrevanthvarma',
            'demo_url': '',
        },
    ],
    'experience': [
        {'id': 'exp_1', 'status': 'In Progress', 'title': 'Professional AI & ML Programme', 'org': 'IIIT Hyderabad', 'description': 'Advanced AI, NLP, & Deep Learning architectures.', 'kind': 'education'},
        {'id': 'exp_2', 'status': '2022 — 2026', 'title': 'B.E. in Computer Science Engineering (AI & ML)', 'org': 'Keshav Memorial Engineering College, Hyderabad', 'description': 'Final year — focused on AI pipelines, async systems, applied ML.', 'kind': 'education'},
        {'id': 'exp_3', 'status': '2024', 'title': 'Sports Talent Assessment Platform — Project Lifecycle', 'org': 'Independent Build', 'description': 'Designed, built, and shipped an async vision pipeline with REST surface and admin tooling end-to-end.', 'kind': 'project'},
    ],
}


# ---------- Portfolio store helpers ----------
PORTFOLIO_DOC_ID = 'singleton'


async def get_portfolio_doc() -> dict:
    doc = await db.portfolio.find_one({'_id': PORTFOLIO_DOC_ID}, {'_id': 0})
    if not doc:
        # seed
        await db.portfolio.update_one(
            {'_id': PORTFOLIO_DOC_ID},
            {'$set': DEFAULT_PORTFOLIO},
            upsert=True,
        )
        doc = dict(DEFAULT_PORTFOLIO)
    return doc


async def save_portfolio_doc(doc: dict) -> dict:
    # Validate by parsing through PortfolioModel
    portfolio = PortfolioModel(**doc).model_dump()
    await db.portfolio.update_one(
        {'_id': PORTFOLIO_DOC_ID},
        {'$set': portfolio},
        upsert=True,
    )
    return portfolio


# ---------- Public endpoints ----------
@api_router.get('/')
async def root():
    return {'message': 'Revanth Varma — Portfolio API'}


@api_router.get('/health')
async def health():
    return {'status': 'ok', 'timestamp': datetime.now(timezone.utc).isoformat()}


@api_router.get('/portfolio')
async def get_portfolio():
    return await get_portfolio_doc()


@api_router.post('/contact', response_model=ContactMessage, status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get('/contact', response_model=List[ContactMessage])
async def list_contact_messages(_: dict = Depends(get_current_admin), limit: int = 200):
    docs = await db.contact_messages.find({}, {'_id': 0}).sort('created_at', -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


# ---------- Auth endpoints ----------
@api_router.post('/auth/login', response_model=TokenOut)
async def login(payload: LoginIn):
    email = payload.email.lower().strip()
    user = await db.users.find_one({'email': email})
    if not user or not verify_password(payload.password, user.get('password_hash', '')):
        raise HTTPException(status_code=401, detail='Invalid email or password')
    token = create_token(user['id'], user['email'])
    return TokenOut(
        token=token,
        user=AdminUser(id=user['id'], email=user['email'], name=user.get('name', 'Admin'), role=user.get('role', 'admin')),
    )


@api_router.get('/auth/me', response_model=AdminUser)
async def me(current: dict = Depends(get_current_admin)):
    return AdminUser(id=current['id'], email=current['email'], name=current.get('name', 'Admin'), role=current.get('role', 'admin'))


@api_router.post('/auth/logout')
async def logout(_: dict = Depends(get_current_admin)):
    return {'ok': True}


# ---------- Admin portfolio endpoints ----------
@api_router.put('/admin/portfolio/profile')
async def update_profile(payload: ProfileModel, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    doc['profile'] = payload.model_dump()
    return await save_portfolio_doc(doc)


@api_router.put('/admin/portfolio/skills')
async def update_skills(payload: List[SkillGroupModel], _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    doc['skills'] = [s.model_dump() for s in payload]
    return await save_portfolio_doc(doc)


@api_router.post('/admin/portfolio/projects')
async def add_project(payload: ProjectModel, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    new_proj = payload.model_dump()
    # ensure unique id
    if any(p['id'] == new_proj['id'] for p in doc['projects']):
        new_proj['id'] = f"project_{uuid.uuid4().hex[:6]}"
    doc['projects'].append(new_proj)
    return await save_portfolio_doc(doc)


@api_router.put('/admin/portfolio/projects/{project_id}')
async def update_project(project_id: str, payload: ProjectModel, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    updated = payload.model_dump()
    updated['id'] = project_id
    found = False
    for i, p in enumerate(doc['projects']):
        if p['id'] == project_id:
            doc['projects'][i] = updated
            found = True
            break
    if not found:
        raise HTTPException(status_code=404, detail='Project not found')
    return await save_portfolio_doc(doc)


@api_router.delete('/admin/portfolio/projects/{project_id}')
async def delete_project(project_id: str, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    before = len(doc['projects'])
    doc['projects'] = [p for p in doc['projects'] if p['id'] != project_id]
    if len(doc['projects']) == before:
        raise HTTPException(status_code=404, detail='Project not found')
    return await save_portfolio_doc(doc)


@api_router.post('/admin/portfolio/experience')
async def add_experience(payload: ExperienceModel, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    new_exp = payload.model_dump()
    if any(e['id'] == new_exp['id'] for e in doc['experience']):
        new_exp['id'] = f"exp_{uuid.uuid4().hex[:6]}"
    doc['experience'].append(new_exp)
    return await save_portfolio_doc(doc)


@api_router.put('/admin/portfolio/experience/{exp_id}')
async def update_experience(exp_id: str, payload: ExperienceModel, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    updated = payload.model_dump()
    updated['id'] = exp_id
    found = False
    for i, e in enumerate(doc['experience']):
        if e['id'] == exp_id:
            doc['experience'][i] = updated
            found = True
            break
    if not found:
        raise HTTPException(status_code=404, detail='Experience not found')
    return await save_portfolio_doc(doc)


@api_router.delete('/admin/portfolio/experience/{exp_id}')
async def delete_experience(exp_id: str, _: dict = Depends(get_current_admin)):
    doc = await get_portfolio_doc()
    before = len(doc['experience'])
    doc['experience'] = [e for e in doc['experience'] if e['id'] != exp_id]
    if len(doc['experience']) == before:
        raise HTTPException(status_code=404, detail='Experience not found')
    return await save_portfolio_doc(doc)


@api_router.put('/admin/portfolio')
async def replace_portfolio(payload: PortfolioModel, _: dict = Depends(get_current_admin)):
    return await save_portfolio_doc(payload.model_dump())


@api_router.post('/admin/portfolio/reset')
async def reset_portfolio(_: dict = Depends(get_current_admin)):
    return await save_portfolio_doc(dict(DEFAULT_PORTFOLIO))


app.include_router(api_router)


# ---------- Startup ----------
@app.on_event('startup')
async def on_startup():
    # Seed admin (idempotent)
    existing = await db.users.find_one({'email': ADMIN_EMAIL})
    if not existing:
        await db.users.insert_one({
            'id': str(uuid.uuid4()),
            'email': ADMIN_EMAIL,
            'name': 'Admin',
            'role': 'admin',
            'password_hash': hash_password(ADMIN_PASSWORD),
            'created_at': datetime.now(timezone.utc).isoformat(),
        })
        logger.info('Seeded admin user: %s', ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing.get('password_hash', '')):
        await db.users.update_one(
            {'email': ADMIN_EMAIL},
            {'$set': {'password_hash': hash_password(ADMIN_PASSWORD)}},
        )
        logger.info('Updated admin password hash for: %s', ADMIN_EMAIL)
    # Seed portfolio if missing
    await get_portfolio_doc()
    # Indexes
    try:
        await db.users.create_index('email', unique=True)
    except Exception as e:
        logger.warning('users.email index: %s', e)


@app.on_event('shutdown')
async def on_shutdown():
    client.close()
