FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Fix permissions for node_modules/.bin
RUN chmod -R 755 node_modules/.bin

COPY . .

# Ensure react-scripts has execute permissions
RUN chmod +x node_modules/.bin/react-scripts

# Set environment variables for the build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-https://project-issue-tracker-1.onrender.com}

# Run build with fixed permissions
RUN npm run build --legacy-peer-deps

# Production environment
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Add nginx config to properly serve React Router routes
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
