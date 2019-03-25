# base image
FROM node:11.1.0

# set working directory
WORKDIR /usr/src/app

COPY . .

RUN npm install nodemon -g
RUN npm install --save
RUN npm install client --save

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
