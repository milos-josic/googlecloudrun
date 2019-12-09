#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:12-alpine AS builder

 
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


RUN npm install
RUN npm run build 

# #
# # Production stage.
# # This state compile get back the JavaScript code from builder stage
# # It will also install the production package only
# #
FROM node:12-alpine


WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

# ## We just need the build to execute the command
COPY --from=builder /home/node/out/ ./src

EXPOSE 8080

# # Start the service
# # CMD npm start
# #example on building this image docker build -t "test-app-image" .
# #example on starting container based on this image: 
# #docker run -p 83:8080 --name test-container test-app-image 
CMD ["node", "src/index.js"]

