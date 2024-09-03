import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';

import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { getNinjaSchemas } from './routes/ninja.routes';
import { getNinjaController } from './controller';
import ninja from './services/ninja.services';
import village from './services/village.services';
import clan from './services/clan.services ';
import family from './services/family.services';

const app = new OpenAPIHono();

app.get('/', (c) => {
  return c.json({ message: 'Hello World' }, 200);
});
app.notFound((c) => {
  return c.text('Sorry, the page you are looking for does not exist.', 404);
});

app.onError((err, c) => {
  return c.text(
    'Oops! Something went wrong on our end. Please try again later.',
    500,
  );
});

// Use the middleware to serve Swagger UI at /ui

app.get('/api', swaggerUI({ url: '/doc' }));
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Naruto API',
    description:
      'Naruto API is a RESTful service that provides access to detailed data on ninjas from the Naruto anime. Explore character profiles, families,villages, clans, and more. Perfect for developers and fans, it provides a structured gateway to explore the Naruto universe.',
  },
});

// API ROUTES
app.route('/api/ninja', ninja);
app.route('/api/family', family);
app.route('/api/clan', clan);
app.route('/api/village', village);

export default {
  port: 4000,
  fetch: app.fetch,
};
