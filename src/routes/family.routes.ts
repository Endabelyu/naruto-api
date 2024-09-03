import { z } from 'zod';
import { createRoute } from '@hono/zod-openapi';
import {
  createFamilyConflictData,
  createFamilySchema,
  FamilySchema,
} from '../schemas/family.schema';

const API_TAGS = ['Family'];
const getFamilyRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Get all list of families',
  description: 'Fetches all data of families character',
  tags: API_TAGS,
  responses: {
    200: {
      description: 'Respond a message',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: z.array(FamilySchema),
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

const getFamilyByNameRoute = createRoute({
  method: 'get',
  path: '/{name}',
  summary: 'Get family data by name',
  description: 'Fetches a single family',
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
            data: z.array(FamilySchema),
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
const createFamilyRoute = createRoute({
  method: 'post',
  path: '/',
  summary: 'Create a new Family',
  description: 'Creates a new Family in the database.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createFamilySchema,
        },
      },
    },
  },
  tags: API_TAGS,
  responses: {
    201: {
      description: 'Family created successfully.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean(),
            message: z.string(),
            data: FamilySchema,
          }),
        },
      },
    },
    409: {
      description: 'Invalid request due to conflict data',
      content: {
        'application/json': {
          schema: createFamilyConflictData.openapi('CreateFamilyConflictData'),
        },
      },
    },
  },
});

const editFamilyByNameRoute = createRoute({
  method: 'patch',
  path: '/{name}',
  summary: 'Edit family data by name',
  description: 'Edit a single family',
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
              description: 'Payload for edit family data',
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
      description: 'An error occurred while updating the family.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while updating the family.'),
          }),
        },
      },
    },
  },
});
const deleteFamilyByNameRoute = createRoute({
  method: 'delete',
  path: '/{name}',
  summary: 'Delete family data by name',
  description: 'Deleted a single family',
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
        'The request is invalid according to error occurred while deleting for families.',
      content: {
        'application/json': {
          schema: z.object({
            ok: z.boolean().default(false),
            message: z
              .string()
              .default('An error occurred while deleting for families.'),
          }),
        },
      },
    },
  },
});
export {
  getFamilyRoute,
  createFamilyRoute,
  editFamilyByNameRoute,
  getFamilyByNameRoute,
  deleteFamilyByNameRoute,
};
