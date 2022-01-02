
# ReactPy Blog

A small application in which you can create, view or comment on posts.
 With basic authentication login and register. And setup with docker-compose. 

 Uses ReactJS on frontend, Flask on backend and PostgreSQL as db.
 
 


## Appendix

frontend -> Contains reactjs files (create-react-app)

backend -> Contains Flask server pyhton file (app.py)


## Installation

#### Environment Variables

Under services: api: environment: `SQLALCHEMY_DATABASE_URI` for connecting to the postgres db

Breakdown is as follows

postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}

The corresponding variables are set in the db service

services: db: environment: `POSTGRES_USER` `POSTGRES_PASSWORD` `POSTGRES_DB`
 can be set to any value we want and we need to set the same values in api service `SQLALCHEMY_DATABASE_URI` required for flask to connect to db.

Install my-project with docker-compose.yml

* Clone the project 
* In the root directory or the folder with contains `docker-compose.yml` run the following commands

```bash
  docker-compose build
  docker-compose up
```
This will spin up the containers download necessary packages and will start the servers

*Visit http://localhost:3000 to view the react app* 

*Server is configured on port 5000 and db on 5432*  
    
