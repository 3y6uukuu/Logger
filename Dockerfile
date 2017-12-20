FROM node:8.9

RUN npm install -g pm2

RUN mkdir -p /src
WORKDIR /src

COPY app/* /src/
RUN npm install

EXPOSE 8081

CMD pm2 start index.js --no-daemon --name logger