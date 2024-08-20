FROM node:20.12.2

WORKDIR /app

RUN apt-get update -qq
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

COPY ./package.json /app/
RUN npm install -g @vue/cli

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]