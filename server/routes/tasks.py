from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database import get_db
from services.task import get_tasks_from_db,add_task,delete_task,get_my_tasks_from_db,get_user_tasks_from_db,get_task_by_id,update_task_by_id,get_user_tasks
from typing import Optional,List
from schemas.Task import Task as TaskSchema
from schemas.Task import TaskUpdateSchema




router=APIRouter()


@router.post("/addtask")
def add_task_route(new_task:TaskSchema,db:Session = Depends(get_db)):
    return add_task(db,new_task)



@router.get("/alltasks")
def get_tasks_route(db:Session = Depends(get_db)):
    return get_tasks_from_db(db)    

@router.get("/mytasks/{user_id}")
def get_tasks_route(user_id: int, db: Session = Depends(get_db)):
    tasks = get_user_tasks_from_db(db, user_id)
    return tasks if tasks else []  # Return [] if tasks is None or empty

@router.get("/usertasks/{user_id}")
def get_tasks_route(user_id: int, db: Session = Depends(get_db)):
    tasks = get_user_tasks(db, user_id)
    return tasks if tasks else []  # Return [] if tasks is None or empty


@router.put("/delete/{id}")
def soft_delete_task_route(id:int,db:Session = Depends(get_db)):

    deleted_task = delete_task(db, id)
    if deleted_task:
        return {"message": "Task deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Task not found")   


# @router.get("/", response_model=List[Task])
# async def get_tasks_route():
#     return await get_tasks_from_db()

@router.get("/task/{task_id}")
def get_task_route(task_id: int, db: Session = Depends(get_db)):
    task = get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/task/{task_id}")
def update_task_route(task_id: int, task_data: TaskUpdateSchema, db: Session = Depends(get_db)):
    updated_task = update_task_by_id(db, task_id, task_data)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found or could not be updated")
    return {"message": "Task updated successfully", "task": updated_task}

