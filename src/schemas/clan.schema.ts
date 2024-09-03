import { z } from '@hono/zod-openapi';
export const IdSchema = z.coerce.number().int().min(1).openapi({
  description: 'Unique identifier for the clan',
  example: 1,
});

// Define the Zod schema for the Family type
export const clanSchema = z
  .object({
    id: IdSchema,
    name: z.string().min(1, 'Name is Required').openapi({
      description: 'The name of ninja clan',
      example: 'Uzumaki',
    }),
    createdAt: z.date().optional().openapi({
      description: 'Timestamp when the data clan was created',
      example: '2023-08-24T12:00:00Z',
    }),
    updatedAt: z.date().optional().openapi({
      description: 'Timestamp when the clan was last updated',
      example: '2023-08-25T12:00:00Z',
    }),
  })
  .openapi('Clan');

export const createClanSchema = clanSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi('CreateClan');

export const createClanConflictData = z.object({
  ok: z.boolean().openapi({
    example: false,
  }),
  message: z.string().openapi({
    description: 'Message according error',
    example: 'Data Clan already exist!',
  }),
});
