FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb first to leverage Docker cache
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Copy prisma folder (if it's separate from the rest of the code)
COPY prisma ./prisma/

# Run Prisma generate to ensure the client is generated
RUN bun prisma generate

# Start the application
CMD ["bun", "start:production"]
