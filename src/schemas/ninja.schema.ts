// interface Ninja {
//   id: string;
//   name: string;
//   village: string;
//   family: Family[];
// }

import { z } from '@hono/zod-openapi';

// Define the Zod schema for the Family type
export const FamilySchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Define the Zod schema for the Ninja type
export const NinjaSchema = z.object({
  id: z.string(),
  name: z.string(),
  village: z.string(),
  family: z.array(FamilySchema),
  clan: z.string().optional(),
});
