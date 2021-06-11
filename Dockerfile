FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json /home/node/
RUN npm i

COPY . /home/node/
RUN npm run build

# ---

FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm i

CMD ["node", "dist/main.js"]