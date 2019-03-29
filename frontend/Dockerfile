FROM node:10

RUN mkdir -p /app

COPY package*.json ./app/
COPY build/ ./app/

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "prod"]