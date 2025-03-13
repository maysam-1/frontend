from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
DATABASE_URL=os.getenv("DATABASE_URL","postgresql://postgres:Maysam123@db:5435/APT_DB")
engine=create_engine(DATABASE_URL,echo=True)
SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

base=declarative_base()
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()    

