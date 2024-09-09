// interface Ninja {
//   id: string;
//   name: string;
//   village: string;
//   family: Family[];
// }

import { z } from '@hono/zod-openapi';
import { villageSchema } from './village.schema';
import { FamilySchema } from './family.schema';
import { clanSchema } from './clan.schema';

const IdSchema = z.coerce.number().int().min(1).openapi({
  description: 'Unique identifier for the village',
  example: 1,
});
// Define the Zod schema for the Ninja type
export const NinjaSchema = z
  .object({
    id: IdSchema,
    name: z.string(),
    village: villageSchema.nullable(),
    family: FamilySchema.nullable(),
    clan: clanSchema.nullable(),
    createdAt: z.date().optional().openapi({
      description: 'Timestamp when the data village was created',
      example: '2023-08-24T12:00:00Z',
    }),
    updatedAt: z.date().optional().openapi({
      description: 'Timestamp when the village was last updated',
      example: '2023-08-25T12:00:00Z',
    }),
  })
  .openapi('Ninja');

export const payloadNinjaSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(5)
      .max(100),
    village_id: z
      .number()
      .min(1)
      .positive('Village ID must be positive')
      .nullable(),
    family_id: z
      .number()
      .min(1)
      .positive('Family ID must be positive')
      .nullable(),
    clan_id: z.number().min(1).positive('Clan ID must be positive').nullable(),
  })
  .openapi('Payload ninja');

export const createNinjaConflictData = z.object({
  ok: z.boolean().openapi({
    example: false,
  }),
  message: z.string().openapi({
    description: 'Message according error',
    example: 'Data ninja already exist!',
  }),
});
