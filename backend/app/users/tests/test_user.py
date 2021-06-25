import pytest
from app import app
from app.users.models import User
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_user(mock_user):
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/v1/users/1",)
        assert response.status_code == 200
        assert response.json().get("email") == mock_user.to_dict().get("email")


@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/users/",
            json={
                "email": "rysev-a@yandex.ru",
                "hashed_password": "password",
                "is_active": True,
            },
        )
        assert response.status_code == 200
    user = await User.get(1)
    assert user.to_dict().get("email") == "rysev-a@yandex.ru"


@pytest.mark.asyncio
async def test_remove_user(mock_user):
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.delete("/api/v1/users/1")
        assert response.status_code == 200
        user = await User.query.where(User.id == 1).gino.first()
        assert user == None
