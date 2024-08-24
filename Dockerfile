FROM oven/bun

WORKDIR /app

# COPY . .
COPY . /app

RUN bun install

EXPOSE 80
CMD [ "bun","dev" ]
