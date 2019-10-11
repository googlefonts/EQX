# Getting Started

Requirements: Please make sure to use Node 10 or more.

## Starting Frontend Server (Next)

```bash
cd frontend
npm install
killall -9 node # Port in use?
npm run dev
```

## Backend server for Dev

We are using SQLite since its easier and can be easily swapped out for Postgres on launch/prod.


## Starting Backend Server (Strapi) for Production 

Requirements: Have Postgres installed and running on your machine.

Brew? Follow this. https://www.robinwieruch.de/postgres-sql-macos-setup

```bash 
createdb eqx
```

otherwise.. install PostgreSQL yourself. https://www.postgresql.org/download/ and create a PostgreSQL database as specified in database.json.

```json
"client": "postgres",
"host": "127.0.0.1",
"port": "5433",
"database": "eqx",
"username": "postgres",
"password": "postgres"
```

Start Backend

```bash
cd backend
npm install
strapi start
```


# Stack

Google's OFFICIAL Material Components  
https://github.com/material-components/material-components-web-react

NextJS for the frontend framework  
https://github.com/zeit/next.js

Strapi for the Headless CMS  
https://github.com/strapi/strapi

PostgreSQL for the Database  
https://www.postgresql.org/download/



# Resources

## Tutorials

Strapi and Next  
https://blog.strapi.io/strapi-next-setup/ 

What is the _app.js File?  
https://nextjs.org/docs/#custom-app




# To Do

Remove reactstrap and bootstrap


