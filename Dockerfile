FROM node:16.15-alpine AS dev
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node . .
RUN yarn install && yarn dev

FROM node:16.15-alpine AS builder
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node . .
RUN yarn install --production && yarn build

FROM node:16.15-alpine AS prod
USER node
WORKDIR /home/node/app
COPY --from=builder --chown=node /home/node/app/node_modules ./node_modules
COPY --from=builder --chown=node /home/node/app/dist ./dist
COPY --from=builder --chown=node /home/node/app/package.json .
CMD [ "yarn", "start" ]