#use official python image
FROM python:3.13 
#set the working directory 
WORKDIR /server
#install system dependencies for postgrsql
RUN apt-get update && apt-get install -y libpq-dev
#copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#copy the fastapi application 
COPY . .

EXPOSE 8000

# CMD [ "python", "create_tables.py" ]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

