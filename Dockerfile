FROM oven/bun

WORKDIR /app

# COPY . .
COPY . /app

RUN bun install

EXPOSE 4000
CMD [ "bun","dev" ]
