FROM node:16-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Remove the dev dependencys
RUN npm install --omit=dev

EXPOSE 8765
CMD ["node","server/index.js"]
