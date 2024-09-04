import { z } from '@hono/zod-openapi';
export const IdSchema = z.coerce.number().int().min(1).openapi({
  description: 'Unique identifier for the clan',
  example: 1,
});

// Define the Zod schema for the Family type
export const FamilySchema = z
  .object({
    id: IdSchema,
    name: z.string().min(1, 'Name is Required').openapi({
      description: 'The name of ninja family',
      example: 'Minato',
    }),
    created_at: z.date().optional().openapi({
      description: 'Timestamp when the data family was created',
      example: '2023-08-24T12:00:00Z',
    }),
    updated_at: z.date().optional().openapi({
      description: 'Timestamp when the family was last updated',
      example: '2023-08-25T12:00:00Z',
    }),
  })
  .openapi('Family');

export const createFamilySchema = z
  .object({
    name: z.string().min(4),
  })
  .openapi('CreateFamily');

export const createFamilyConflictData = z.object({
  ok: z.boolean().openapi({
    example: false,
  }),
  message: z.string().openapi({
    description: 'Message according error',
    example: 'Data family already exist!',
  }),
});
