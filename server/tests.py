import pytest
from models.user import User  # Import your User model
from database import SessionLocal  # Your DB session
from schemas import UserCreate  # Import your user schema if applicable
from utils import validate_username  # Assuming you have a validation function

# Fixture to create a test database session
@pytest.fixture
def db_session():
    db = SessionLocal()
    yield db
    db.close()

# Test username validation function
@pytest.mark.parametrize("username, expected", [
    ("validUser", True),      # Valid username
    ("a", False),             # Too short
    ("thisisaverylongusername", False),  # Too long
    ("user_123", False),      # Invalid character (assuming only alphanumeric allowed)
    ("", False),              # Empty username
])
def test_validate_username(username, expected):
    assert validate_username(username) == expected

# Test for uniqueness in database
def test_unique_username(db_session):
    new_user = User(username="uniqueUser", password="hashedpassword")
    db_session.add(new_user)
    db_session.commit()

    # Trying to add the same username again should fail
    with pytest.raises(Exception):  # Adjust the exception based on your database setup
        duplicate_user = User(username="uniqueUser", password="hashedpassword")
        db_session.add(duplicate_user)
        db_session.commit()
