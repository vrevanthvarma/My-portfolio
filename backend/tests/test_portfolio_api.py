"""Backend API tests for Revanth Varma portfolio CMS (auth + admin CRUD)."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@revanth.dev"
ADMIN_PASSWORD = "revanth2026"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(client):
    r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------- Public Portfolio ----------
class TestPortfolio:
    def test_portfolio_structure(self, client):
        r = client.get(f"{API}/portfolio", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "profile" in data and "skills" in data and "projects" in data and "experience" in data
        assert data["profile"]["email"]
        assert isinstance(data["skills"], list)
        assert isinstance(data["projects"], list)
        assert isinstance(data["experience"], list)


# ---------- Auth ----------
class TestAuth:
    def test_login_success(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "token" in d and isinstance(d["token"], str) and len(d["token"]) > 50
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"

    def test_login_wrong_password(self, client):
        r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass!"}, timeout=15)
        assert r.status_code == 401
        assert r.json().get("detail") == "Invalid email or password"

    def test_login_wrong_email(self, client):
        r = client.post(f"{API}/auth/login", json={"email": "nope@x.com", "password": "whatever"}, timeout=15)
        assert r.status_code == 401

    def test_me_no_token(self, client):
        r = client.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_invalid_token(self, client):
        r = client.get(f"{API}/auth/me", headers={"Authorization": "Bearer not-a-token"}, timeout=15)
        assert r.status_code == 401

    def test_me_ok(self, client, auth_headers):
        r = client.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == ADMIN_EMAIL
        assert d["role"] == "admin"


# ---------- Admin Portfolio CRUD ----------
class TestAdminPortfolio:
    def test_bulk_put_unauthorized(self, client):
        r = client.put(f"{API}/admin/portfolio", json={}, timeout=15)
        assert r.status_code == 401

    def test_update_profile_persists(self, client, auth_headers):
        # Get current
        cur = client.get(f"{API}/portfolio", timeout=15).json()
        new_profile = dict(cur["profile"])
        original_tagline = new_profile["tagline"]
        new_profile["tagline"] = "TEST tagline " + os.urandom(3).hex()

        r = client.put(f"{API}/admin/portfolio/profile", json=new_profile, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text

        # Verify via public GET
        check = client.get(f"{API}/portfolio", timeout=15).json()
        assert check["profile"]["tagline"] == new_profile["tagline"]

        # Restore
        new_profile["tagline"] = original_tagline
        client.put(f"{API}/admin/portfolio/profile", json=new_profile, headers=auth_headers, timeout=15)

    def test_update_skills_replaces(self, client, auth_headers):
        cur = client.get(f"{API}/portfolio", timeout=15).json()
        original = cur["skills"]

        replacement = [{"key": "test", "group": "TEST Group", "items": ["A", "B", "C"]}]
        r = client.put(f"{API}/admin/portfolio/skills", json=replacement, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text

        check = client.get(f"{API}/portfolio", timeout=15).json()
        assert len(check["skills"]) == 1
        assert check["skills"][0]["group"] == "TEST Group"
        assert check["skills"][0]["items"] == ["A", "B", "C"]

        # Restore
        client.put(f"{API}/admin/portfolio/skills", json=original, headers=auth_headers, timeout=15)

    def test_projects_crud(self, client, auth_headers):
        new_proj = {
            "title": "TEST Project CRUD",
            "subtitle": "automated",
            "description": "from pytest",
            "category": "AI / ML",
            "categoryKey": "aiml",
            "tech": ["Pytest"],
            "metrics": [{"label": "Accuracy", "value": "99%"}],
            "link": "https://example.com",
            "demo_url": "",
        }
        # CREATE
        r = client.post(f"{API}/admin/portfolio/projects", json=new_proj, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        doc = r.json()
        created = next((p for p in doc["projects"] if p["title"] == "TEST Project CRUD"), None)
        assert created is not None
        pid = created["id"]

        # UPDATE
        updated = dict(created)
        updated["title"] = "TEST Project CRUD Updated"
        r2 = client.put(f"{API}/admin/portfolio/projects/{pid}", json=updated, headers=auth_headers, timeout=15)
        assert r2.status_code == 200
        check = client.get(f"{API}/portfolio", timeout=15).json()
        assert any(p["id"] == pid and p["title"] == "TEST Project CRUD Updated" for p in check["projects"])

        # DELETE
        r3 = client.delete(f"{API}/admin/portfolio/projects/{pid}", headers=auth_headers, timeout=15)
        assert r3.status_code == 200
        check2 = client.get(f"{API}/portfolio", timeout=15).json()
        assert all(p["id"] != pid for p in check2["projects"])

        # DELETE nonexistent → 404
        r4 = client.delete(f"{API}/admin/portfolio/projects/does-not-exist", headers=auth_headers, timeout=15)
        assert r4.status_code == 404

    def test_experience_crud(self, client, auth_headers):
        new_exp = {
            "status": "TEST 2026",
            "title": "TEST Experience Entry",
            "org": "Test Org",
            "description": "pytest entry",
            "kind": "work",
        }
        r = client.post(f"{API}/admin/portfolio/experience", json=new_exp, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text
        doc = r.json()
        created = next((e for e in doc["experience"] if e["title"] == "TEST Experience Entry"), None)
        assert created is not None
        eid = created["id"]

        updated = dict(created)
        updated["description"] = "updated desc"
        r2 = client.put(f"{API}/admin/portfolio/experience/{eid}", json=updated, headers=auth_headers, timeout=15)
        assert r2.status_code == 200
        check = client.get(f"{API}/portfolio", timeout=15).json()
        assert any(e["id"] == eid and e["description"] == "updated desc" for e in check["experience"])

        r3 = client.delete(f"{API}/admin/portfolio/experience/{eid}", headers=auth_headers, timeout=15)
        assert r3.status_code == 200

        r4 = client.delete(f"{API}/admin/portfolio/experience/does-not-exist", headers=auth_headers, timeout=15)
        assert r4.status_code == 404

    def test_bulk_replace_and_reset(self, client, auth_headers):
        cur = client.get(f"{API}/portfolio", timeout=15).json()

        # Add a marker via bulk PUT
        modified = dict(cur)
        modified["profile"] = dict(cur["profile"])
        modified["profile"]["tagline"] = "BULK_TEST_TAGLINE"
        r = client.put(f"{API}/admin/portfolio", json=modified, headers=auth_headers, timeout=15)
        assert r.status_code == 200, r.text

        check = client.get(f"{API}/portfolio", timeout=15).json()
        assert check["profile"]["tagline"] == "BULK_TEST_TAGLINE"

        # Reset
        r2 = client.post(f"{API}/admin/portfolio/reset", headers=auth_headers, timeout=15)
        assert r2.status_code == 200
        check2 = client.get(f"{API}/portfolio", timeout=15).json()
        assert check2["profile"]["name"] == "Vejandla Revanth Varma"
        assert check2["profile"]["tagline"] != "BULK_TEST_TAGLINE"


# ---------- Contact ----------
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_AutoUser",
            "email": "test_auto@example.com",
            "subject": "TEST subject",
            "message": "TEST message from pytest",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert "id" in data

    def test_create_contact_invalid_email(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Bad", "email": "not-an-email", "message": "hi"
        }, timeout=15)
        assert r.status_code == 422

    def test_list_contact_requires_auth(self, client):
        r = client.get(f"{API}/contact", timeout=15)
        assert r.status_code == 401

    def test_list_contact_with_auth(self, client, auth_headers):
        r = client.get(f"{API}/contact", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
