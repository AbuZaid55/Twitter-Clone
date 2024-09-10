FROM node:20
WORKDIR /twitter_clone/frontend
COPY ./package*json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]