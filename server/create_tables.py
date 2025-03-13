from database import engine,base
from models.task import Task
from models.user import User
from models.priority import Priority  
from sqlalchemy.orm import sessionmaker

base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine)

session = SessionLocal()

# Insert predefined priorities if they don't exist
if session.query(Priority).count() == 0:
    priorities = [
    Priority(id=1, name="High"),
    Priority(id=2, name="Medium"),
    Priority(id=3, name="Low"),
            ]
    session.add_all(priorities)
    session.commit()

    session.close()
