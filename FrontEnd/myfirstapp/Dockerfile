FROM node:12

RUN mkdir /app

WORKDIR /app

ENV NODE_ENV development

COPY package*.json ./


RUN npm install 

RUN npm install react-scripts@4.0.3 -g




COPY . .

EXPOSE 3000


CMD ["npm", "start"]
