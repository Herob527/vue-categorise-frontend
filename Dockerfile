FROM oven/bun:1.2.4-slim AS base

WORKDIR /app

COPY package.json bun.lock /app/

RUN bun install --frozen-lockfile

FROM base AS dev

COPY . /app

EXPOSE 5173

CMD [ "bun", "run", "start" ]

FROM base AS prod

COPY . /app

RUN bun run build

EXPOSE 4173

CMD ["bun", "run", "preview"]
