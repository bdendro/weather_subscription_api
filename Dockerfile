FROM node:22.15.0

WORKDIR /app
COPY . .

RUN npm install

CMD ["sh", "-c", "npm run migrate && npm start"]
