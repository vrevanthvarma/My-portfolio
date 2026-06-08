"""Backend API tests for Revanth Varma portfolio."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://agent-portfolio-pro.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "timestamp" in data


# ---------- Portfolio ----------
class TestPortfolio:
    def test_portfolio_structure(self, client):
        r = client.get(f"{API}/portfolio", timeout=15)
        assert r.status_code == 200
        data = r.json()

        # Profile
        assert data["profile"]["name"] == "Vejandla Revanth Varma"
        assert data["profile"]["email"] == "vrevanth2004@gmail.com"
        assert "linkedin" in data["profile"]
        assert "github" in data["profile"]
        assert "resume_url" in data["profile"]

        # Counts
        assert len(data["projects"]) == 3
        assert len(data["skills"]) == 4
        assert len(data["experience"]) == 3

        # Skill groups present
        groups = {g["group"] for g in data["skills"]}
        assert {"Languages", "Frameworks & Libraries", "Cloud & Tools", "DevRel"}.issubset(groups)


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
        assert "id" in data and isinstance(data["id"], str)
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "created_at" in data

        # Verify persistence via GET
        list_r = client.get(f"{API}/contact", timeout=15)
        assert list_r.status_code == 200
        items = list_r.json()
        assert any(item.get("id") == data["id"] for item in items)

    def test_create_contact_invalid_email(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "hi"
        }, timeout=15)
        assert r.status_code == 422

    def test_create_contact_missing_message(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_NoMsg",
            "email": "x@y.com"
        }, timeout=15)
        assert r.status_code == 422

    def test_create_contact_empty_message(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Empty",
            "email": "x@y.com",
            "message": ""
        }, timeout=15)
        assert r.status_code == 422

    def test_list_contact_sorted_desc(self, client):
        # Create two contacts in order
        p1 = client.post(f"{API}/contact", json={
            "name": "TEST_Order1", "email": "o1@example.com", "message": "first"
        }, timeout=15).json()
        p2 = client.post(f"{API}/contact", json={
            "name": "TEST_Order2", "email": "o2@example.com", "message": "second"
        }, timeout=15).json()

        r = client.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        items = r.json()
        ids = [it["id"] for it in items]
        assert p1["id"] in ids and p2["id"] in ids
        # Latest first: p2 should appear before p1
        assert ids.index(p2["id"]) < ids.index(p1["id"])
