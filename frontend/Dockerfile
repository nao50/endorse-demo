FROM node:10.13-stretch

RUN npm install -g @angular/cli

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN yarn --pure-lockfile

EXPOSE 4200