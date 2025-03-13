
from pydantic import BaseModel
from typing import Optional,List


class Task(BaseModel):
    id:Optional[int]=None
    title:str
    dueDate:str
    image:Optional[str]=None
    isDone:bool = False
    isPublic:int
    deleted:bool = False
    deletedOn:Optional[str]=None
    priority_id:int
    user_id:int



class TaskUpdateSchema(BaseModel):
    title: Optional[str] = None
    dueDate: Optional[str] = None
    image: Optional[str] = None
    isPublic: Optional[int] = None  # Change to int
    priority_id: Optional[int] = None

    class Config:
        orm_mode = True