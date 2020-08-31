# gcr.io/eqx-host/frontend:<hash>

FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -f
RUN npm rebuild node-sass
RUN npm rebuild @material-ui/lab

COPY . .

RUN npm run-script build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
