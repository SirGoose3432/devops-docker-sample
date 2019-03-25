# base image
FROM node:11.1.0

# set working directory
WORKDIR /usr/src/app

<<<<<<< HEAD
COPY package*.json ./

RUN npm install nodemon -g
RUN npm install --silent

EXPOSE 3000

COPY . .

CMD [ "npm", "run", "dev" ]
=======
COPY . .

RUN npm install nodemon -g
RUN npm install
RUN npm install client

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
>>>>>>> dockerize
