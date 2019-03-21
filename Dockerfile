# base image
FROM node:11.1.0

# set working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install nodemon -g
RUN npm install --silent

EXPOSE 3000

COPY . .

CMD [ "npm", "run", "dev" ]