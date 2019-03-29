FROM node:10

RUN mkdir -p /benckmarking
RUN mkdir -p /false-patterns
RUN mkdir -p /selected-projects

RUN mkdir -p /app

COPY package*.json ./app/
COPY index.js ./app/
COPY .babelrc ./app/

WORKDIR /app

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
