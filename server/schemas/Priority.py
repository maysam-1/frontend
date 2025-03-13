
from pydantic import BaseModel
from typing import Optional,List


class Priority(BaseModel):
    id:Optional[int]=None
    name:str
