FROM node:10.21.0 as build-stage
ENV PATH /usr/local/bin:$PATH
ADD . /code
WORKDIR /code
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /code/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
