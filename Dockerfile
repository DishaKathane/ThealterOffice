FROM node:16

# Create and set the working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 6000

# Start the application
CMD ["npm", "start"]
