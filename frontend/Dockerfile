# gcr.io/eqx-host/frontend:<hash>

FROM node:14

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
### Install chrome for puppeteer (and breaking it up)
RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libatk1.0-0
RUN apt-get install -y libc6 libcairo2 libcups2 
RUN apt-get install -y libdbus-1-3 libexpat1 libfontconfig1
RUN apt-get install -y libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 
RUN apt-get install -y libglib2.0-0 libgtk-3-0 libnspr4
RUN apt-get install -y libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 
RUN apt-get install -y libx11-6 libx11-xcb1 libxcb1 
RUN apt-get install -y libxcomposite1 libxcursor1 libxdamage1 libxext6 
RUN apt-get install -y libxfixes3 libxi6 libxrandr2 libxrender1
RUN apt-get install -y libxss1 libxtst6 ca-certificates 
RUN apt-get install -y fonts-liberation libappindicator1 libnss3 
RUN apt-get install -y lsb-release xdg-utils wget
RUN npm install -f
# RUN npm rebuild node-sass -f

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"