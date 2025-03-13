
from typing import Optional,List
from models.priority import Priority
from sqlalchemy.orm import Session
from fastapi import HTTPException


def get_priorities_from_db(db:Session):
    try:
        return db.query(Priority).all() or []
    except Exception as e:
        logging.error(f"Error fetching priorities: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

