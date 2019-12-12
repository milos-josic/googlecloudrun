#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:12-alpine
 
 #the USER step tells Docker to run any subsequent build steps,
# and later the process in the container, as the node user,
# which is an unprivileged user that comes built into all of the official node images from Docker.
# Without this line, they would run as root, which is against security best practices and in particular the principle of least privilege. Many Docker tutorials skip this step for simplicity, 
# and we will have to do some extra work to avoid running as root, but I think it’s very important.
USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node

# Create a group and user
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup


COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY ./test ./test


RUN npm install
RUN npm run build 
 
RUN ["npm", "run", "test"]
