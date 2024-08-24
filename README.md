# Naruto API

This is a simple Naruto API built using [Hono.js](https://hono.dev/). It allows you to manage a collection of ninjas with operations such as retrieving, creating, updating, and deleting ninja data.

## Features

- **GET** `/ninja`: Retrieve the list of all ninjas.
- **GET** `/ninja/:id`: Retrieve a specific ninja by their ID.
- **POST** `/ninja`: Create a new ninja.
- **DELETE** `/ninja/:id`: Delete a ninja by their ID.
- **PATCH** `/ninja/:id`: Update specific fields of a ninja by their ID.

## Prerequisites

- Node.js (>=20.x)
- bun

## Getting Started

1. **Clone the repository**:

```bash
git clone <https://github.com/Endabelyu/naruto-api.git>
cd naruto-api
```

2. **Install dependencies**:

```bash
  bun install
```

3. **Run the project**

```bash
 bun dev
```

## Endpoints

Documentation about endpoints and response will be present with Swagger UI <https://swagger.io/> asap.
