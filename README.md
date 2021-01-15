# EQX

## Demos

**Frontend**: <http://34.73.108.93>

**Backend**: <http://35.231.157.252/admin>


## Getting Started

Quickstart tip:

    docker-compose up
    # Timeout issues? COMPOSE_HTTP_TIMEOUT=1000 docker-compose up
    # Still not working? docker-compose build --no-cache

**Frontend**: [http://localhost:3000](http://localhost:3000)

**Backend**: [http://localhost:1337](http://localhost:1337)
    

# Resources

## Stack summary

* [Material UI Components for React](https://material-ui.com/)
* [NextJS](https://github.com/zeit/next.js) for the frontend framework
* [Strapi](https://github.com/strapi/strapi) for the Headless CMS
* [PostgreSQL](https://www.postgresql.org/download) for the Database


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

#### Step 1
First stop and delete instance.

```bash
nvm use 14
```

#### Step 2
Then on backed.

```bash
npm cache clean --force
rm -r build
rm .yard-lock
rm .yard-lock
rm package-lock.json
rm -r node_modules
```


#### Step 3
Then on frontend.

```bash
npm cache clean --force
rm .next
rm .yard-lock
rm package-lock.json
rm -r node_modules
```

#### Step 4
Then on root.

```bash
docker-compose pull
docker-compose build --no-cache
# repeat step 1 and 2 if necessary
COMPOSE_HTTP_TIMEOUT=1000 docker-compose up # Timeout issues? 
```

