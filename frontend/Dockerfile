# gcr.io/eqx-host/frontend:<hash>

FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -f
RUN npm rebuild node-sass

COPY . .

RUN npm run-script build

CMD [ "npm", "run", "dev" ]
