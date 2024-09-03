import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';
import { NinjaSchema } from '../schemas/ninja.schema';
import {
  clanSchema,
  createClanConflictData,
  createClanSchema,
} from '../schemas/clan.schema';

const API_TAGS = ['Clan'];
const getClanRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Get all list of clans',
  description: 'Fetches all data of clans character',
  tags: API_TAGS,
  responses: {
    200: {
      description: 'Respond a message',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(clanSchema),
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

const getClanByNameRoute = createRoute({
  method: 'get',
  path: '/{name}',
  summary: 'Get clan by name',
  description: 'Fetches a single clan',
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
            data: z.array(clanSchema),
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
      description: 'No clans were found that match the name parameters.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('No clans were found with the provided name.'),
          }),
        },
      },
    },
  },
});
const createClanRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new clan',
  description: 'Creates a new clan in the database.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createClanSchema,
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
            data: clanSchema,
          }),
        },
      },
    },
    409: {
      description: 'Invalid request due to conflict data',
      content: {
        'application/json': {
          schema: createClanConflictData.openapi('CreateClanConflictData'),
        },
      },
    },
  },
});

const editClanByNameRoute = createRoute({
  method: 'patch',
  path: '/{name}',
  summary: 'Edit clan data by name',
  description: 'Edit a single clan',
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
              description: 'Payload for edit clan data',
              example: 'Uchiha',
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
      description: 'An error occurred while updating the clan.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while updating the clan.'),
          }),
        },
      },
    },
  },
});
const deleteClanByNameRoute = createRoute({
  method: 'delete',
  path: '/{name}',
  summary: 'Delete clan data by name',
  description: 'Deleted a single clan',
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
        'The request is invalid according to error occurred while deleting for clans.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while deleting for clans.'),
          }),
        },
      },
    },
  },
});
export {
  getClanRoute,
  createClanRoute,
  getClanByNameRoute,
  deleteClanByNameRoute,
  editClanByNameRoute,
};
