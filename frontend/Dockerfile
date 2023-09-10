FROM node:16.8.0-bullseye

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm install -g nodemon
RUN npm run build

CMD npm run start
