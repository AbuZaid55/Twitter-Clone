FROM node:20
WORKDIR /twitter_clone/backend
COPY ./package*json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 8000
CMD [ "npm","run","start" ]