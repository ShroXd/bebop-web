FROM node:10.21.0 as build-stage

WORKDIR /code
COPY package*.json ./
RUN npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /code/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /code/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
