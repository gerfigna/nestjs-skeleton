FROM node:14-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli @mikro-orm/cli @mikro-orm/mysql

COPY package.json yarn.lock ./

RUN yarn install

ENV NODE_ENV=development

RUN yarn build

CMD ["yarn", "start:debug"]
