FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --omit dev
RUN npm run seed

EXPOSE 3000

CMD ["node", "dist/main"]