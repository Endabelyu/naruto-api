import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createClanRoute,
  deleteClanByNameRoute,
  editClanByNameRoute,
  getClanByNameRoute,
  getClanRoute,
} from '../routes/clan.routes';
import {
  createClan,
  deleteClanByName,
  editClanByName,
  getAllClans,
  getClanByName,
} from '../models/clan';

// Use the middleware to serve Swagger UI at /ui
const clan = new OpenAPIHono();

// The openapi.json will be available at /doc

clan.openapi(getClanRoute, async (c) => {
  const clans = await getAllClans();
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: clans,
    },
    200,
  );
});
clan.openapi(createClanRoute, async (c) => {
  const { name } = await c.req.json();
  const { data, code } = await createClan(name);
  console.log(code, 'create clan');

  if (code === 409) {
    return c.json(
      {
        ok: false,
        message: 'Data clan already exist!',
        data: data!,
      },
      409,
    );
  }
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: data!,
    },
    201,
  );
});

clan.openapi(getClanByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await getClanByName(name);
  if (code === 404) {
    return c.json(
      {
        ok: false,
        message: message!,
      },
      404,
    );
  }
  return c.json(
    {
      ok: true,
      message: message!,
      data: dataGet!,
    },
    200,
  );
});
clan.openapi(editClanByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { name: payload } = await c.req.json();
  const { dataGet, code, message } = await editClanByName(name, payload);
  if (code === 400) {
    return c.json(
      {
        ok: false,
        message: message!,
      },
      400,
    );
  } else if (code === 500) {
    return c.json(
      {
        ok: false,
        message: message!,
      },
      500,
    );
  }
  return c.json(
    {
      ok: true,
      message: message!,
    },
    200,
  );
});

clan.openapi(deleteClanByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await deleteClanByName(name);
  if (code === 400) {
    return c.json(
      {
        ok: false,
        message: message!,
      },
      400,
    );
  } else if (code === 500) {
    return c.json(
      {
        ok: false,
        message: message!,
      },
      500,
    );
  }
  return c.json(
    {
      ok: true,
      message: message!,
      data: dataGet!,
    },
    200,
  );
});

export default clan;
