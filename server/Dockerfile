FROM node:20.12.2

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y default-mysql-client

COPY . .

EXPOSE 3000

RUN chmod +x ./wait-for-db-container.sh
CMD ["sh", "./wait-for-db-container.sh"]