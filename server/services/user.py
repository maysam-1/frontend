from sqlalchemy.orm import Session
from models.user import User
from schemas.User import UserCreate
from schemas.User import UserSignIn


def sign_in_user(db: Session, user: UserSignIn):
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user and existing_user.password == user.password:
            return existing_user  # Return user if email and password match
        return None  # If no match is found
    except Exception as e:
        print(f"Error signing in user: {e}")  # Log the error
        return None  # Return None in case of an error


def create_user(db: Session, user: UserCreate):
    try:
        new_user = User(username=user.username, email=user.email, password=user.password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()  # Rollback if any error occurs
        print(f"Error creating user: {e}")  # Log the error
        return None  # Return None in case of an error