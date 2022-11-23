FROM node:19.1

WORKDIR /usr/app

ADD . .
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]

# docker build -t altr .
# docker run -p 8080:8080 -it altr 