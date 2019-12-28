FROM node:8.12.0-alpine
MAINTAINER spike

RUN mkdir -p /home/bebop-web
WORKDIR /home/bebop-web

ADD . /home/bebop-web

RUN yarn install

ENV HOST 0.0.0.0
ENV PORT 8000

EXPOSE 8080

CMD ["npm", "start"]