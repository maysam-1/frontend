from sqlalchemy import Column, Integer, String, Boolean, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from database import base  # Import Base from your database config

class Task(base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    dueDate = Column(String, nullable=False)
    image=Column(String, default="https://static.vecteezy.com/system/resources/thumbnails/040/531/854/small/document-and-pencil-sign-in-pixel-art-style-vector.jpg")
    isDone = Column(Boolean, default=False)
    isPublic= Column(Integer, nullable=False)
    deleted=Column(Boolean,default=False)
    deletedOn=Column(DateTime,nullable=True)
    priority_id=Column(Integer,ForeignKey("priorities.id"),nullable=False)
    priority = relationship("Priority", back_populates="tasks")  # Relationship to Priority

    # ForeignKey to link tasks to a user
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    # Relationship: Each task belongs to one user
    owner = relationship("User", back_populates="tasks")
