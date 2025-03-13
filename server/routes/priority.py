from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database import get_db
from services.priority import get_priorities_from_db
from typing import Optional,List
from schemas.Priority import Priority as prioritySchema

router=APIRouter()


@router.get("/allpriorities")
def get_tasks_route(db:Session = Depends(get_db)):
    return get_priorities_from_db(db) 