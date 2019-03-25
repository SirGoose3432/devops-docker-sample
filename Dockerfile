# base image
FROM node:11.1.0

# set working directory
WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
