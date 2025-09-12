# --- base image ---
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]