FROM oven/bun:1.2.4-slim

RUN useradd -ms /bin/sh -u 1001 app

USER app

WORKDIR /app

COPY package.json .

COPY bun.lock .

RUN bun install

COPY --chown=app:app . /app

EXPOSE 5173

CMD [ "bun", "run", "start" ]
