FROM node:14.16.0-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile --no-cache

CMD [ "yarn", "start" ]
