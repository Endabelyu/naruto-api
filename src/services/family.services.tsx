import { OpenAPIHono } from '@hono/zod-openapi';
import { getNinjaSchemas } from '../routes/ninja.routes';
import {
  createFamilyRoute,
  deleteFamilyByNameRoute,
  editFamilyByNameRoute,
  getFamilyByNameRoute,
  getFamilyRoute,
} from '../routes/family.routes';
import { getDataNinja } from '../models/ninja';
import {
  createFamily,
  deleteFamilyByName,
  editFamilyByName,
  getFamily,
  getFamilyByName,
} from '../models/familly';

// Use the middleware to serve Swagger UI at /ui
const family = new OpenAPIHono();

// The openapi.json will be available at /doc

family.openapi(getFamilyRoute, async (c) => {
  const family = await getFamily();
  return c.json(
    {
      ok: true,
      message: 'Success!',
      data: family!,
    },
    200,
  );
});
family.openapi(createFamilyRoute, async (c) => {
  const { name } = await c.req.json();
  const { data, code } = await createFamily(name);
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

family.openapi(getFamilyByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await getFamilyByName(name);
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
family.openapi(editFamilyByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { name: payload } = await c.req.json();
  const { dataGet, code, message } = await editFamilyByName(name, payload);
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

family.openapi(deleteFamilyByNameRoute, async (c) => {
  const { name } = c.req.param();
  const { dataGet, code, message } = await deleteFamilyByName(name);
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
export default family;
