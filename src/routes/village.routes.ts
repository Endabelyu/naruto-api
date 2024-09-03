import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';
import {
  createVillageConflictData,
  createvillageSchema,
  villageSchema,
} from '../schemas/village.schema';

const API_TAGS = ['Village'];
const getVillageRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Get all list of villages',
  description: 'Fetches all data of villages',
  tags: API_TAGS,
  responses: {
    200: {
      description: 'Respond a message',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(villageSchema),
          }),
        },
      },
    },
    // 400: {
    //   description:
    //     'Invalid request due to incorrect parameters or data format.',
    //   content: {
    //     'application/json': {
    //       schema: z.object({
    //         errorCode: z.string().default('INVALID_FILTER_FORMAT'),
    //         message: z
    //           .string()
    //           .default('The filter parameter must be in key=value format.'),
    //       }),
    //     },
    //   },
    // },
  },
});

const getVillageByNameRoute = createRoute({
  method: 'get',
  path: '/{name}',
  summary: 'Get Village data by name',
  description: 'Fetches a single Village',
  tags: API_TAGS,
  request: {
    params: z.object({
      name: z.string().min(1),
    }),
  },
  responses: {
    200: {
      description: 'A list of families matching the name.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(villageSchema),
          }),
        },
      },
    },
    400: {
      description:
        'The request is invalid due to incorrect parameters or data format.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default(
                'The request could not be processed due to invalid parameters or data format.',
              ),
          }),
        },
      },
    },
    404: {
      description: 'No families were found that match the name parameters.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('No families were found with the provided name.'),
          }),
        },
      },
    },
  },
});
const createVillageRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new village',
  description: 'Creates a new village in the database.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createvillageSchema,
        },
      },
    },
  },
  tags: API_TAGS,
  responses: {
    201: {
      description: 'Village created successfully.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: villageSchema,
          }),
        },
      },
    },
    409: {
      description: 'Invalid request due to conflict data',
      content: {
        'application/json': {
          schema: createVillageConflictData.openapi(
            'CreateVillageConflictData',
          ),
        },
      },
    },
  },
});

const editVillageByNameRoute = createRoute({
  method: 'patch',
  path: '/{name}',
  summary: 'Edit village data by name',
  description: 'Edit a single village',
  tags: API_TAGS,
  request: {
    params: z.object({
      name: z.string().min(1),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().min(1).openapi({
              description: 'Payload for edit village data',
              example: 'Konohagakure',
            }),
          }),
        },
      },
    },
  },

  responses: {
    200: {
      description: 'Status of the update process',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description:
        'The request is invalid due to incorrect parameters or data format.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default(
                'The request could not be processed due to invalid parameters or data format.',
              ),
          }),
        },
      },
    },
    500: {
      description: 'An error occurred while updating the village.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while updating the village.'),
          }),
        },
      },
    },
  },
});
const deleteVillageByNameRoute = createRoute({
  method: 'delete',
  path: '/{name}',
  summary: 'Delete village data by name',
  description: 'Deleted a single village',
  tags: API_TAGS,
  request: {
    params: z.object({
      name: z.string().min(5),
    }),
  },
  responses: {
    200: {
      description: 'Status of deleted process',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description:
        'The request is invalid due to incorrect parameters or data format.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default(
                'The request could not be processed due to invalid parameters or data format.',
              ),
          }),
        },
      },
    },

    500: {
      description:
        'The request is invalid according to error occurred while deleting for villages.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while deleting for villages.'),
          }),
        },
      },
    },
  },
});
export {
  getVillageRoute,
  createVillageRoute,
  editVillageByNameRoute,
  getVillageByNameRoute,
  deleteVillageByNameRoute,
};
