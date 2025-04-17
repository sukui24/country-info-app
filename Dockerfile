# Use official Node.js image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the project
RUN npm run build

# Expose the app port (adjust if needed)
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start:prod"]
