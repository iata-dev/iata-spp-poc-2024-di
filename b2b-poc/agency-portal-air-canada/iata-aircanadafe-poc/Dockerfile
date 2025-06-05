# Use Node.js as the base image
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3004

CMD ["nginx", "-g", "daemon off;"]