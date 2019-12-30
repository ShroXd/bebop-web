FROM node:8.12.0-alpine
ENV PATH /usr/local/bin:$PATH
ADD . /code
WORKDIR /code
EXPOSE 8080
RUN npm i --registry https://registry.npm.taobao.org
CMD npm run dev