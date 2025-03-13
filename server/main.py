from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional,List
from routes.tasks import router as task_router 
from routes.user import router as user_router
from routes.priority import router as priority_router
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()

origins=[
    "https://localhost:3000",
    "*"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(task_router,prefix="/tasks")
app.include_router(user_router,prefix="/users")
app.include_router(priority_router,prefix="/priorities")
