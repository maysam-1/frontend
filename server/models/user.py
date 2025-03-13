from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import base  

class User(base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    # Relationship: A user has multiple tasks
    tasks = relationship("Task", back_populates="owner", cascade="all, delete-orphan")
