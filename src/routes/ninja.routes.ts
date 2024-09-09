import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';
import {
  createNinjaConflictData,
  NinjaSchema,
  payloadNinjaSchema,
} from '../schemas/ninja.schema';

const API_TAGS = ['Ninja'];
const getNinjaRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Get all list of ninjas',
  description: 'Fetches all data of ninjas character',
  tags: API_TAGS,
  responses: {
    200: {
      description: 'Respond a message',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(NinjaSchema),
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

const getNinjaByNameRoute = createRoute({
  method: 'get',
  path: '/{name}',
  summary: 'Get ninja by name',
  description: 'Fetches a single ninja',
  tags: API_TAGS,
  request: {
    params: z.object({
      name: z.string().min(1),
    }),
  },
  responses: {
    200: {
      description: 'A list of clans matching the name.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(NinjaSchema),
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
      description: 'No ninjas were found that match the name parameters.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('No ninjas were found with the provided name.'),
          }),
        },
      },
    },
  },
});
const createNinjaRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new ninja data',
  description: 'Creates a new ninja in the database.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: payloadNinjaSchema,
        },
      },
    },
  },
  tags: API_TAGS,
  responses: {
    201: {
      description: 'Clan created successfully.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: payloadNinjaSchema,
          }),
        },
      },
    },
    409: {
      description: 'Invalid request due to conflict data',
      content: {
        'application/json': {
          schema: createNinjaConflictData.openapi('CreateNinjaConflictData'),
        },
      },
    },
    400: {
      description: 'Invalid request due to error when get from db',
      content: {
        'application/json': {
          schema: createNinjaConflictData.openapi('CreateNinjaConflictData'),
        },
      },
    },
  },
});

const editNinjaByIdRoute = createRoute({
  method: 'patch',
  path: '/{id}',
  summary: 'Edit ninja data by id',
  description: 'Edited a single ninja',
  tags: API_TAGS,
  request: {
    params: z.object({
      id: z.coerce.number().min(1),
    }),
    body: {
      content: {
        'application/json': {
          schema: payloadNinjaSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Status of edited process',
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
        'The request is invalid according to error occurred while editing for ninjas.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while editing for ninjas.'),
          }),
        },
      },
    },
  },
});
const deleteNinjaByIdRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  summary: 'Delete ninja data by id',
  description: 'Deleted a single ninja',
  tags: API_TAGS,
  request: {
    params: z.object({
      id: z.coerce.number().min(1),
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
        'The request is invalid according to error occurred while deleting for ninjas.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while deleting for ninjas.'),
          }),
        },
      },
    },
  },
});
export {
  getNinjaRoute,
  createNinjaRoute,
  getNinjaByNameRoute,
  deleteNinjaByIdRoute,
  editNinjaByIdRoute,
};
