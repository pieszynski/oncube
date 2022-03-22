FROM node:16.13.2-slim
WORKDIR /app
EXPOSE 8080
COPY ./src .
ENTRYPOINT ["node", "app.js"] 