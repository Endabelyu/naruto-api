FROM oven/bun

WORKDIR /app

COPY . /app

RUN bun install

COPY prisma ./prisma/

COPY . .

# RUN bunx prisma migrate
RUN bunx prisma generate

EXPOSE 4000
CMD [ "bun","start:production" ]
