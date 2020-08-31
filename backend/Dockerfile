# gcr.io/eqx-host/backend:<hash>

FROM strapi/base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run-script build

EXPOSE 1337

CMD [ "npm", "run", "dev" ]
