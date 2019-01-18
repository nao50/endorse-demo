FROM node:10.13-stretch

RUN npm install -g @angular/cli

RUN mkdir /app
WORKDIR /app
ADD . /app
# RUN yarn --pure-lockfile

RUN npm install
RUN npm rebuild node-sass --force

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]