import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createNinjaRoute,
  deleteNinjaByIdRoute,
  editNinjaByIdRoute,
  getNinjaByNameRoute,
  getNinjaRoute,
} from '../routes/ninja.routes';
import {
  createNinja,
  deleteNinjaById,
  editNinjaById,
  getAllNinjas,
  getNinjaByName,
} from '../models/ninja';

// Use the middleware to serve Swagger UI at /ui
const ninja = new OpenAPIHono();

// The openapi.json will be available at /doc

ninja.openapi(getNinjaRoute, async (c) => {
  const ninja = await getAllNinjas();
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: ninja,
      // data: ninja!,
    },
    200,
  );
});

ninja.openapi(createNinjaRoute, async (c) => {
  const payload = await c.req.json();
  const { data, code, message } = await createNinja(payload);
  if (code === 409) {
    return c.json(
      {
        ok: false,
        message: 'Data clan already exist!',
      },
      409,
    );
  } else if (code === 400) {
    return c.json(
      {
        ok: false,
        message: message ? message : '',
      },
      400,
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

ninja.openapi(getNinjaByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await getNinjaByName(name);
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
ninja.openapi(editNinjaByIdRoute, async (c) => {
  const { id } = c.req.param();
  const payload = await c.req.json();
  console.log(id, payload, 'editsss');
  const { code, message } = await editNinjaById(Number(id), payload);
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

ninja.openapi(deleteNinjaByIdRoute, async (c) => {
  const { id } = c.req.param();
  const idNinja = parseInt(id);
  const { dataGet, code, message } = await deleteNinjaById(idNinja);
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
export default ninja;
