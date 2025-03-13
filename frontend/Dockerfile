FROM node:22.13

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

RUN npm install -omit=dev

COPY . .

# Install dependencies
RUN npm run



EXPOSE 3000

CMD ["npm", "start"]