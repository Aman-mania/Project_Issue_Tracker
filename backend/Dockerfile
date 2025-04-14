FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Fix permissions for node_modules/.bin
RUN chmod -R 755 node_modules/.bin

COPY . .

# Ensure TypeScript compiler has execute permissions
RUN chmod +x node_modules/.bin/tsc

# Run build with fixed permissions
RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]