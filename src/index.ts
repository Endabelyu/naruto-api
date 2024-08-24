import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import {
  createDataNinja,
  deleteNinjaById,
  editDataNinja,
  getDataNinja,
  getDataNinjaById,
} from './ninja';

const app = new Hono();
// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }));

app.get('/', (c) => {
  return c.json({ message: 'Hello World' }, 200);
});
// get ninja

app.get('/ninja', (c) => {
  const ninja = getDataNinja();
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: ninja,
    },
    200,
  );
});

app.get('/ninja/:id', (c) => {
  const id = c.req.param('id');
  const ninjaById = getDataNinjaById(id);

  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: ninjaById,
    },
    200,
  );
});
// get ninja

// create ninja
app.post('/ninja', async (c) => {
  const ninjaBody = await c.req.json();
  const addNinja = createDataNinja(ninjaBody);

  if (addNinja.code === 200) {
    return c.json(
      {
        ok: true,
        message: 'New data ninja successfully added!',
        data: addNinja.data,
      },
      201,
    );
  } else
    return c.json(
      {
        ok: false,
        message: addNinja.message,
      },
      409,
    );
});
// create ninja

// delete ninja
app.delete('/ninja/:id', async (c) => {
  const id = c.req.param('id');
  const deleteNinja = deleteNinjaById(id);

  if (deleteNinja.code === 404) {
    return c.json(
      {
        ok: false,
        message: deleteNinja.message,
      },
      404,
    );
  } else {
    return c.json(
      {
        ok: true,
        message: deleteNinja.message,
        data: deleteNinja.data,
      },
      200,
    );
  }
});
// delete ninja

// edit data ninja
app.patch('/ninja/:id', async (c) => {
  const bodyNinja = await c.req.json();
  const id = c.req.param('id');
  const editNinja = editDataNinja(id, bodyNinja);

  if (editNinja.code === 404) {
    return c.json(
      {
        ok: false,
        message: editNinja.message,
      },
      404,
    );
  } else {
    return c.json(
      {
        ok: true,
        message: editNinja.message,
        data: editNinja.data,
      },
      200,
    );
  }
});
// edit data ninja

app.notFound((c) => {
  return c.text('Your request not found', 404);
});

// app.onError((err, c) => {
//   console.error(`${err}`);
//   return c.text('Custom Error Message', 500);
// });
export default {
  port: 80,
  fetch: app.fetch,
};
