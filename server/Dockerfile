# Stage 1
FROM node:16-alpine AS BUILD

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

COPY . .

# Stage 2

FROM node:16-alpine

WORKDIR /app

COPY --from=BUILD /app .

ENV NODE_ENV production

RUN npm prune --production

EXPOSE 8000

CMD [ "node", "server.js" ]