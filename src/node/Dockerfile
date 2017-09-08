FROM node
WORKDIR /home/node

COPY package.json .

RUN npm install 

COPY . .

ENV NODE_ENV production
EXPOSE 80
CMD ["npm", "start"]
