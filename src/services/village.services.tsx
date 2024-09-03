import { OpenAPIHono } from '@hono/zod-openapi';
import { getDataNinja } from '../models/ninja';
import {
  createVillageRoute,
  deleteVillageByNameRoute,
  editVillageByNameRoute,
  getVillageByNameRoute,
  getVillageRoute,
} from '../routes/village.routes';
import {
  createVillage,
  deleteVillageByName,
  editVillageByName,
  getVillage,
  getVillageByName,
} from '../models/village';

// Use the middleware to serve Swagger UI at /ui
const village = new OpenAPIHono();

// The openapi.json will be available at /doc

village.openapi(getVillageRoute, async (c) => {
  const village = await getVillage();
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: village!,
    },
    200,
  );
});
village.openapi(createVillageRoute, async (c) => {
  const { name } = await c.req.json();
  const { data, code } = await createVillage(name);
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

village.openapi(getVillageByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await getVillageByName(name);
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
village.openapi(editVillageByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { name: payload } = await c.req.json();
  const { dataGet, code, message } = await editVillageByName(name, payload);
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

village.openapi(deleteVillageByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await deleteVillageByName(name);
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
export default village;
