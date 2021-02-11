FROM node

WORKDIR /app

RUN yarn && yarn global add typescript
