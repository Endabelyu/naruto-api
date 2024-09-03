import { z } from '@hono/zod-openapi';
export const IdSchema = z.coerce.number().int().min(1).openapi({
  description: 'Unique identifier for the village',
  example: 1,
});

// Define the Zod schema for the Family type
export const villageSchema = z
  .object({
    id: IdSchema,
    name: z.string().min(1, 'Name is Required').openapi({
      description: 'The name of ninja village',
      example: 'Konohagakure',
    }),
    createdAt: z.date().optional().openapi({
      description: 'Timestamp when the data village was created',
      example: '2023-08-24T12:00:00Z',
    }),
    updatedAt: z.date().optional().openapi({
      description: 'Timestamp when the village was last updated',
      example: '2023-08-25T12:00:00Z',
    }),
  })
  .openapi('village');

export const createvillageSchema = villageSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi('Createvillage');

export const createVillageConflictData = z.object({
  ok: z.boolean().openapi({
    example: false,
  }),
  message: z.string().openapi({
    description: 'Message according error',
    example: 'Data village already exist!',
  }),
});
