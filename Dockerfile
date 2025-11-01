# Multi-stage build for Entersys Frontend
# Stage 1: Build the application
FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
# Temporarily using npm install instead of npm ci while regenerating lockfile
RUN npm install

# Copy source code
COPY . .

# Build the application for production environment
RUN npm run build:prod

# Stage 2: Production server with nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy modular CSP configuration first (needed by nginx.conf)
COPY csp-config.conf /etc/nginx/conf.d/csp-config.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add labels for better container management
LABEL maintainer="Entersys Development Team"
LABEL version="1.0"
LABEL description="Entersys Frontend - React + Vite + Nginx"

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
