# Stage 1

FROM node:16-alpine AS BUILD

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN npm run build

# Stage 2

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILD /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]