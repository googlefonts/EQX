# gcr.io/eqx-host/frontend:<hash>

FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -f
RUN npm rebuild node-sass -f

COPY . .

RUN npm run-script build

CMD [ "npm", "run", "dev" ]
