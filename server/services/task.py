
from schemas.Task import Task as TaskSchema
from typing import Optional,List
import asyncio
from models.task import Task
from sqlalchemy.orm import Session
from datetime import datetime
from models.user import User
from schemas.Task import TaskUpdateSchema


def add_task(db: Session, task: TaskSchema):
    """Adds a new task to the database."""
    try:
        image_to_store = task.image if task.image else None  
        db_task = Task(
            title=task.title, 
            dueDate=task.dueDate, 
            image=image_to_store, 
            isPublic=task.isPublic, 
            priority_id=task.priority_id, 
            user_id=task.user_id
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        print(f"Error adding task: {e}")
        db.rollback()  # Rollback changes on error
        return None



def delete_task(db: Session, id: int):
    """Soft deletes a task by setting 'deleted' to True."""
    try:
        db_task = db.query(Task).filter(Task.id == id).first()
        if db_task:
            db_task.deleted = True
            db_task.deletedOn = datetime.utcnow()
            db.commit()
            db.refresh(db_task)
            return db_task
        return None
    except Exception as e:
        print(f"Error deleting task: {e}")
        db.rollback()
        return None



def get_user_tasks_from_db(db: Session, user_id: int):
    """Fetches public tasks for a specific user."""
    try:
        tasks = (
            db.query(Task, User.username)
            .join(User, Task.user_id == User.id)
            .filter(Task.user_id == user_id, Task.deleted == False)
            .all()
        )
        return [
            {
                "id": task.id,
                "title": task.title,
                "image": task.image,
                "dueDate": task.dueDate,
                "isPublic": task.isPublic,
                "priority_id": task.priority_id,
                "user_id": task.user_id,
                "username": username,
            }
            for task, username in tasks  # Unpack tuple (Task, User.username)
        ]
    except Exception as e:
        print(f"Error fetching user tasks: {e}")
        return []





def get_user_tasks(db: Session, user_id: int):
    """Fetches public tasks for a specific user."""
    try:
        tasks = (
            db.query(Task, User.username)
            .join(User, Task.user_id == User.id)
            .filter(Task.user_id == user_id, Task.deleted == False,Task.isPublic==1)
            .all()
        )
        return [
            {
                "id": task.id,
                "title": task.title,
                "image": task.image,
                "dueDate": task.dueDate,
                "isPublic": task.isPublic,
                "priority_id": task.priority_id,
                "user_id": task.user_id,
                "username": username,
            }
            for task, username in tasks  # Unpack tuple (Task, User.username)
        ]
    except Exception as e:
        print(f"Error fetching user tasks: {e}")
        return []




def get_my_tasks_from_db(db: Session, user_id: int):
    """Fetches all tasks for a specific user (including private)."""
    try:
        return db.query(Task).filter(Task.user_id == user_id, Task.deleted == False).all()
    except Exception as e:
        print(f"Error fetching my tasks: {e}")
        return []



def get_tasks_from_db(db: Session):
    """Fetches all public tasks with usernames."""
    try:
        tasks = (
            db.query(Task, User.username)
            .join(User, Task.user_id == User.id)
            .filter(Task.deleted == False, Task.isPublic == 1)
            .all()
        )
        return [
            {
                "id": task.id,
                "title": task.title,
                "image": task.image,
                "dueDate": task.dueDate,
                "isPublic": task.isPublic,
                "priority_id": task.priority_id,
                "user_id": task.user_id,
                "username": username,
            }
            for task, username in tasks  # Unpacking tuple (Task, username)
        ]
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return []


def get_task_by_id(db: Session, task_id: int):
    try:
        task = db.query(Task).filter(Task.id == task_id).first()
        return task
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        return None   



def update_task_by_id(db: Session, task_id: int, task_data: TaskUpdateSchema):
    try:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None  # Task not found
        
        # Update task fields dynamically
        for key, value in task_data.dict(exclude_unset=True).items():
            setattr(task, key, value)

        db.commit()
        db.refresh(task)
        return task  # Return updated task
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        db.rollback()
        return None             



def update_task_by_id(db: Session, task_id: int, task_data: TaskUpdateSchema):
    try:
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None  # Task not found
        
        # Update task fields dynamically
        for key, value in task_data.dict(exclude_unset=True).items():
            setattr(task, key, value)

        db.commit()
        db.refresh(task)
        return task  # Return updated task
    except SQLAlchemyError as e:
        print(f"Database error: {e}")
        db.rollback()
        return None        