FROM node:18

COPY ./package.json /withtypes/
COPY ./yarn.lock /withtypes/
WORKDIR /withtypes/
RUN yarn install

COPY . /withtypes/

CMD yarn dev
