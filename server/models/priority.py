from sqlalchemy import Column, Integer, String, Boolean, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database import base  # Import Base from your database config

class Priority(base):
    __tablename__ = "priorities"

    id = Column(Integer, primary_key=True, index=True)
    name=Column(String, nullable=False)
    tasks = relationship("Task", back_populates="priority")  # Relationship to Task

    