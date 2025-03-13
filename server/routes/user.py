from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from schemas.User import UserCreate, UserResponse
from services.user import create_user
from database import get_db
from services.user import sign_in_user
from schemas.User import UserSignIn
from models.user import User
from typing import List



router = APIRouter()

@router.post("/", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user)


@router.post("/signin", response_model=UserResponse)
def sign_in(user: UserSignIn, db: Session = Depends(get_db)):
    existing_user = sign_in_user(db, user)
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return existing_user

@router.get("/allusers", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users    

@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user    