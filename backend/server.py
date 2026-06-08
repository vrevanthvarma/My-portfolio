from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Revanth Varma Portfolio API")

_cors_origins_raw = os.environ.get('CORS_ORIGINS', '*')
_cors_origins = [o.strip() for o in _cors_origins_raw.split(',') if o.strip()]
_allow_credentials = '*' not in _cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_credentials=_allow_credentials,
    allow_origins=_cors_origins or ['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

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


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Revanth Varma — Portfolio API"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    try:
        msg = ContactMessage(**payload.model_dump())
        doc = msg.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_messages.insert_one(doc)
        return msg
    except Exception as e:
        logger.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail=f"Could not save message: {str(e)}")


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 100):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.get("/portfolio")
async def get_portfolio():
    """Returns full portfolio content as structured JSON."""
    return {
        "profile": {
            "name": "Vejandla Revanth Varma",
            "title": "AI & ML Engineer · Developer Relations",
            "tagline": "Building Sovereign AI at population scale",
            "college": "Keshav Memorial Engineering College (Affiliated to Osmania University)",
            "summary": "Final-year B.E. student in Computer Science (AI & ML), specialized in building high-performance Python-based AI pipelines and LLM-powered applications. Passionate about translating complex technical systems into accessible developer tools, tutorials, and documentation.",
            "email": "vrevanth2004@gmail.com",
            "phone": "+91 85200 87605",
            "linkedin": "https://linkedin.com/in/vrevanthvarma",
            "github": "https://github.com/vrevanthvarma",
            "resume_url": "https://customer-assets.emergentagent.com/job_3bf2e9d1-2049-4dee-8872-f47d5943740e/artifacts/4yd2u0in_Revanth_Varma_Sarvam_Resume.pdf",
            "availability": "ai/ml · devrel",
        },
        "stats": {"projects": 3, "skills": 25, "milestones": 3},
        "skills": [
            {"group": "Languages", "items": ["Python", "SQL", "JavaScript", "TypeScript"]},
            {"group": "Frameworks & Libraries", "items": ["FastAPI", "React", "TensorFlow", "PyTorch", "scikit-learn", "NumPy", "Pandas", "MediaPipe", "OpenCV"]},
            {"group": "Cloud & Tools", "items": ["Git", "GitHub", "Jupyter Notebook", "Postman", "SQLite", "FAISS", "mBERT", "LLM APIs"]},
            {"group": "DevRel", "items": ["Technical Writing", "API Documentation", "Developer Tutorials", "Interactive Demos"]},
        ],
        "projects": [
            {
                "id": "project_01",
                "category": "AI / ML",
                "title": "AI-Powered Sports Talent Assessment Platform",
                "subtitle": "Real-time pose inference at the edge",
                "description": "An async Python pipeline that ingests live video, runs MediaPipe + OpenCV pose inference, counts repetitions, and flags anomalous patterns in real time — exposed through a FastAPI service.",
                "metrics": [
                    {"label": "Throughput", "value": "24+ FPS"},
                    {"label": "Rep Accuracy", "value": "90%"},
                    {"label": "Fraud Reduction", "value": "~85%"},
                ],
                "tech": ["Python", "FastAPI", "MediaPipe", "OpenCV", "SQLite", "Async"],
                "link": "https://github.com/vrevanthvarma",
            },
            {
                "id": "project_02",
                "category": "LLM · DevRel",
                "title": "LLM-Powered Natural Language to SQL Engine",
                "subtitle": "Schema-aware NL→SQL with sub-3s latency",
                "description": "A retrieval-augmented NL→SQL service: schema-aware prompting, LLM call, validation, then execution against a sandboxed database. Shipped with a React UI and full developer documentation.",
                "metrics": [
                    {"label": "Time Saved", "value": "~70%"},
                    {"label": "Query Types", "value": "15+"},
                    {"label": "Latency", "value": "< 3s"},
                ],
                "tech": ["Python", "FastAPI", "LLM APIs", "NLP", "React", "SQL"],
                "link": "https://github.com/vrevanthvarma",
            },
            {
                "id": "project_03",
                "category": "LLM · DevRel",
                "title": "RAG-Powered Developer Documentation Assistant",
                "subtitle": "Semantic search over multi-repo SDK docs",
                "description": "An on-device retrieval-augmented chat assistant indexing SDK docs across repositories using FAISS + mBERT embeddings. Built as a portable DevRel tool that answers integration questions with citations.",
                "metrics": [
                    {"label": "Answer Accuracy", "value": "94.2%"},
                    {"label": "Avg Latency", "value": "1.2s"},
                    {"label": "Indexed Pages", "value": "12k+"},
                ],
                "tech": ["Python", "FAISS", "mBERT", "FastAPI", "React"],
                "link": "https://github.com/vrevanthvarma",
            },
        ],
        "experience": [
            {
                "status": "In Progress",
                "title": "Professional AI & ML Programme",
                "org": "IIIT Hyderabad",
                "period": "2026 — Present",
                "description": "Advanced AI, NLP, & Deep Learning architectures.",
            },
            {
                "status": "2022 — 2026",
                "title": "B.E. in Computer Science Engineering (AI & ML)",
                "org": "Keshav Memorial Engineering College (Affiliated to Osmania University)",
                "period": "2022 — 2026",
                "description": "Final year — focused on AI pipelines, async systems, applied ML.",
            },
            {
                "status": "2024",
                "title": "AI-Powered Sports Talent Assessment Platform — Project Lifecycle",
                "org": "Independent Build",
                "period": "2024",
                "description": "Designed, built, and shipped an async vision pipeline with REST surface and admin tooling end-to-end.",
            },
        ],
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    force=False,
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
