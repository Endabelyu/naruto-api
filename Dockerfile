FROM oven/bun

WORKDIR /app

COPY . /app

RUN bun install

COPY prisma ./prisma/

COPY . .

# RUN bunx prisma migrate
RUN bunx prisma migrate deploy

RUN bunx prisma db seed

EXPOSE 4000
CMD [ "bun","dev" ]
