FROM oven/bun:1.2.4-slim

WORKDIR /app

COPY package.json .

COPY bun.lock .

RUN bun install

COPY . /app

EXPOSE 5173

CMD [ "bun", "run", "start" ]
