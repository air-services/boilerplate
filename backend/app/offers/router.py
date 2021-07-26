from typing import List

from app.core.database import Base, get_db
from fastapi import APIRouter, Depends
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, asc, desc
from sqlalchemy.orm import Session, relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")


async def main_view(db: Session = Depends(get_db)):
    # db_item = User(email="rysev-a@yandex.ru2")
    # db.add(db_item)
    # db.commit()
    # user = db.query(User).first()
    # item = db.query(Item).first()
    # items = db.query(Item).all()
    #
    # user.items.append(item)
    # db.commit()
    #
    # return {"users": []}
    users = db.query(User).order_by(desc(User.email)).all()

    for user in users:
        print(dir(user))

    return {
        "users": [
            {"email": user.email, "id": user.id, "items": user.items}
            for user in users
        ]
    }


#
# return {"users": users, "items": items}


offers_router = APIRouter(
    prefix="/offers",
)

offers_router.add_api_route(
    "/",
    main_view,
)
