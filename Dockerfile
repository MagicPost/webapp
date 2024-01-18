FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN npm install -g pnpm
RUN pnpm i 

# Copy the application code 
COPY . .
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]