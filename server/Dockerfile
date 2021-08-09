FROM node:14

# WORKDIR /server
WORKDIR /usr/src/app

COPY package.json ./

COPY ./ ./
# COPY ./server ./

# RUN rm -rf node_modules && rm package-lock.json
RUN npm install