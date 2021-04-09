# EQX: A tool for visually evaluating font quality

A new way to test your typefaces, track your progress, and work with teams when designing families:
EQX is a tool for visually evaluating font quality.

EQX was made to replace the typical type design workflow:
web searches, ad-hoc testing strings, and reaching for things on our bookshelves.
In its place is something faster and more useful for type designers, their collaborators, managers, and consulting experts.

We are excited about EQX because it already does a great deal, and it's libre license empowers anyone to use it and build on it.

22 minute introduction presentation at ATypI 2020 by Eben Sorkin:

[youtu.be/L61M-rU43ec](https://www.youtube.com/watch?v=L61M-rU43ec)

Eben is a type designer, teacher, type design reviewer, type art director and now software package designer.
He served on the board of ATypI from 2010-2018.

## Demos

**Frontend**: <http://34.73.108.93>

**Backend**: <http://35.231.157.252/admin>


## Getting Started

We use Docker to setup the EQX environment. Please open terminal, and running `docker-compose up` in the root of this repository. Docker should do the rest!

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

