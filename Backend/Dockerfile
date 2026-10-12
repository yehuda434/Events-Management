# Use official Node.js Alpine LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies needed for TypeScript build)
RUN npm install

# Copy configuration and source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript to JavaScript (/app/dist)
RUN npm run build

# Expose backend port
EXPOSE 4000

# Start production server
CMD ["node", "dist/server.js"]
