# EQX

## Demos

### Production

**Frontend**: <http://34.73.108.93>

**Backend**: <http://35.231.157.252/admin>

### Local

**Frontend**: [http://localhost:3000](http://localhost:3000)

**Backend**: [http://localhost:1337](http://localhost:1337)

Quickstart tip:

    cd frontend && killall -9 node && npm run dev;
    cd backend && npm run develop;

## Getting Started

You can develop using docker-compose, or through node.js on your local machine.

Stack summary:

* [Material UI Components for React](https://material-ui.com/)
* [NextJS](https://github.com/zeit/next.js) for the frontend framework
* [Strapi](https://github.com/strapi/strapi) for the Headless CMS
* [PostgreSQL](https://www.postgresql.org/download) for the Database

### 1. Docker-Compose

To develop using docker-compose:

```bash
docker-compose up 
# Timeout issues? COMPOSE_HTTP_TIMEOUT=1000 docker-compose up
# Still not working? docker-compose build --no-cache
```

### 2. Local Development

To develop using node.js without docker, _using Node 10+:_

#### Frontend Server (Next)

```bash
cd frontend
npm install
killall -9 node # Port in use?
npm run dev
```

#### Backend Server (Strapi) locally

We are using SQLite since its easier, and can be easily swapped out for Postgres on launch/prod.

```bash
cd backend
npm install
npm start # or npm run develop
```

#### Backend Server (Strapi) for Production

Requirements: Have Postgres installed and running on your machine.

If using HomeBrew, follow [this set up guide](https://www.robinwieruch.de/postgres-sql-macos-setup)

```bash
createdb eqx
```

If installing PostgreSQL yourself from <https://www.postgresql.org/download>, then create a PostgreSQL database as specified in this `database.json`:

```json
"client": "postgres",
"host": "127.0.0.1",
"port": "5433",
"database": "eqx",
"username": "postgres",
"password": "postgres"
```

To start the backend:

```bash
cd backend
npm install
strapi start
```
 -->

# Resources

## Tutorials

Strapi and Next
https://blog.strapi.io/strapi-next-setup/

What is the _app.js File?
https://nextjs.org/docs/#custom-app

## Secrets

We use [kubesec](https://github.com/shyiko/kubesec) and Google Cloud KMS to store encrypted secrets in this repo.

To add a new secret, first decrypt, then add secret, and then encrypt. 

#### Secret Encryption

```
gcloud auth application-default login
kubesec encrypt -i --key=gcp:projects/eqx-host/locations/us-east1/keyRings/eqx/cryptoKeys/kubernetes-secrets base/secrets.yaml
```

#### Secret Decryption

 ```
 gcloud auth application-default login
 kubesec decrypt -i base /secrets.yaml
 ```

# Debugging

### Step 1
First stop and delete instance.

```bash
nvm use 14
```

### Step 2
Then on backed.

```bash
npm cache clean --force
rm -r build
rm .yard-lock
rm .yard-lock
rm package-lock.json
rm -r node_modules
```


### Step 3
Then on frontend.

```bash
npm cache clean --force
rm .next
rm .yard-lock
rm package-lock.json
rm -r node_modules
```

### Step 4
Then on root.

```bash
docker-compose pull
docker-compose build --no-cache
# repeat step 1 and 2 if necessary
COMPOSE_HTTP_TIMEOUT=1000 docker-compose up # Timeout issues? 
```

