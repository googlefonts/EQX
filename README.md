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



# Demos

### EQX App
=======
<http://35.237.163.30>  
Username: **example@example.com**  
Password: **example**

### Content API
<http://35.237.56.88/admin>  
Username: **example@admin.com**  
Password: **exampleAdmin1**


# Getting Started

We use Docker to setup the EQX environment. Please open terminal, and running `docker-compose up` in the root of this repository. Docker should do the rest!

```bash
docker-compose up # Timeout issues? COMPOSE_HTTP_TIMEOUT=1000 docker-compose up
```

**Frontend**: <http://localhost:3000>
**Backend**: <http://localhost:1337>


# Resources

## Creating HTML visuals with EQX's Visual Generator

This is a tool to help create visuals for use in EQX. It was created to be used with variable fonts to quickly update a package of HTML testing resources.
You can learn more about it by visiting its repo at <https://github.com/quitequinn/EQX-Visual-Generator>.

## Stack summary

* [Material UI Components for React](https://material-ui.com/)
* [NextJS](https://github.com/zeit/next.js) for the frontend framework
* [Strapi](https://github.com/strapi/strapi) for the Headless CMS
* [PostgreSQL](https://www.postgresql.org/download) for the Database


## Secrets

We use [kubesec](https://github.com/shyiko/kubesec) and Google Cloud KMS to store encrypted secrets in this repo.
To add a new secret, first decrypt, then add secret, and then encrypt.

### Secret Encryption

```bash
gcloud auth application-default login
kubesec encrypt -i --key=gcp:projects/eqx-host/locations/us-east1/keyRings/eqx/cryptoKeys/kubernetes-secrets base/secrets.yaml
```

### Secret Decryption

```bash
gcloud auth application-default login
kubesec decrypt -i base /secrets.yaml
```

## Debugging

### Step 1
Stop and delete instance. Makesure you are using Node 14.

```bash
nvm use 14
```

### Step 2
Navigate to backend (`/EQX/backend`).

```bash
npm cache clean --force
rm -r build
rm .yard-lock
rm .yard-lock
rm package-lock.json
rm -r node_modules
```


### Step 3
Navigate to frontend (`/EQX/frontend`).

```bash
npm cache clean --force
rm -r .next
rm .yard-lock
rm package-lock.json
rm -r node_modules
```

### Step 4
Navigate back to root (`/EQX`).

```bash
docker-compose pull
docker-compose build --no-cache
COMPOSE_HTTP_TIMEOUT=1000 docker-compose up # This increases timeout length (incase your computer is slow) Repeat step 1 and 2 if necessary
```

