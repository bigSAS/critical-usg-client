FROM node:12.8.1-buster-slim as builder

ARG CUSG_CONF_FILE

RUN mkdir /opt/app
COPY . /opt/app/
WORKDIR /opt/app

RUN mv ${CUSG_CONF_FILE} quasar.conf.js

RUN npm install -g @quasar/cli@1.1.0 \
    && npm install && npm install --only=dev
# rebuild sass on win
# RUN npm rebuild node-sass
RUN quasar build web

FROM nginx:1.18-alpine

COPY --from=builder /opt/app/dist/spa /usr/share/nginx/html/
EXPOSE 80
