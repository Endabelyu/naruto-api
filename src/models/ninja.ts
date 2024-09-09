import { z } from 'zod';
import { NinjaSchema, payloadNinjaSchema } from '../schemas/ninja.schema';
import { Ninja, Prisma, PrismaClient } from '@prisma/client';
import { handlePrismaError, PrismaError } from '../utils/prismaErrorsUtils';
import { formatName } from '../utils/formatTextUtils';

// Infer the TypeScript type from the Zod schema
type NinjaS = z.infer<typeof NinjaSchema>;
type payloadNinja = z.infer<typeof payloadNinjaSchema>;
export const prisma = new PrismaClient();
type Response = {
  data?: Ninja;
  dataGet?: NinjaS[];
  code: number;
  message?: string;
};
export async function getAllNinjas(): Promise<NinjaS[]> {
  try {
    const ninjas = await prisma.ninja.findMany({
      include: {
        village: true,
        family: true,
        clan: true,
      },
    });
    return ninjas;
  } catch (error) {
    throw error;
  }
}

export async function createNinja(payload: Ninja): Promise<Response> {
  const { name } = payload;
  try {
    const checkNinja = await prisma.ninja.findUnique({ where: { name } });
    if (checkNinja) {
      return {
        code: 409,
      };
    }
    return {
      data: await prisma.ninja.create({
        data: {
          name: payload.name,
          village_id: payload.village_id ?? undefined,
          family_id: payload.family_id ?? undefined,
          clan_id: payload.clan_id ?? undefined,
        },
      }),
      code: 201,
    };
  } catch (error) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function getNinjaByName(name: string): Promise<Response> {
  try {
    const ninjas = await prisma.ninja.findMany({
      where: {
        name: {
          contains: name, // This will search for any record where 'name' includes the given substring
          mode: 'insensitive', // This makes the search case-insensitive
        },
      },
      include: {
        village: true,
        family: true,
        clan: true,
      },
    });

    if (ninjas.length === 0) {
      return {
        code: 404,
        message: 'No ninjas found matching the name parameters.',
      };
    }

    return {
      code: 200,
      dataGet: ninjas,
    };
  } catch (error) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function editNinjaById(
  id: number,
  payload: Prisma.NinjaUpdateInput,
): Promise<Response> {
  try {
    const updateNinja = await prisma.ninja.update({
      where: {
        id: id,
      },
      data: payload,
    });
    if (!updateNinja) {
      return {
        code: 404,
        message: 'No ninjas found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Ninja data updated successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}
export async function deleteNinjaById(id: number): Promise<Response> {
  try {
    const deleteUser = await prisma.ninja.delete({
      where: {
        id: id,
      },
    });
    if (!deleteUser) {
      return {
        code: 404,
        message: 'No ninjas found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Ninja data deleted successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}

// ################################################ NON-DB-CODE ###################################################
// export const initialNinja: Ninja[] = [
//   {
//     id: '1',
//     name: 'Naruto Uzumaki',
//     village: 'Konohagakure',
//     family: [
//       {
//         id: '1',
//         name: 'Minato Namikaze',
//       },
//       {
//         id: '2',
//         name: 'Kushina Uzumaki',
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Sasuke Uchiha',
//     village: 'Konohagakure',
//     family: [
//       {
//         id: '3',
//         name: 'Fugaku Uchiha',
//       },
//       {
//         id: '4',
//         name: 'Mikoto Uchiha',
//       },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Sakura Haruno',
//     village: 'Konohagakure',
//     family: [
//       {
//         id: '5',
//         name: 'Kizashi Haruno',
//       },
//       {
//         id: '6',
//         name: 'Mebuki Haruno',
//       },
//     ],
//   },
// ];

// export function getDataNinja() {
//   return initialNinja;
// }

// export function getDataNinjaById(id: string) {
//   const filteredNinja = initialNinja.find((ninja) => ninja.id === id);
//   return filteredNinja;
// }

// export function createDataNinja(newNinja: Ninja) {
//   const checkNinja = initialNinja.find((current) =>
//     current.name.toLowerCase().includes(newNinja.name),
//   );
//   if (checkNinja) {
//     return {
//       message: 'Data with the same name already exists and cannot be created.',
//       code: 409,
//     };
//   }
//   let newId;
//   if (initialNinja.length === 0) {
//     newId = '1';
//   } else {
//     newId = `${initialNinja.length + 1}`;
//   }
//   initialNinja.push({
//     ...newNinja,
//     id: newId!,
//   });
//   return { data: initialNinja, code: 200 };
// }

// export function deleteNinjaById(id: string) {
//   const index = initialNinja.findIndex((ninja) => ninja.id === id);

//   if (index === -1) {
//     return { code: 404, message: 'No data ninja available' };
//   }

//   initialNinja.splice(index, 1);
//   return {
//     code: 200,
//     message: 'Data ninja successfully deleted!',
//     data: initialNinja,
//   };
// }

// export function editDataNinja(id: string, updatedData: Partial<Ninja>) {
//   const index = initialNinja.findIndex((ninja) => ninja.id === id);

//   if (index === -1) {
//     return { code: 404, message: 'No data ninja available' };
//   }

//   // Update the ninja data with the provided fields in updatedData
//   initialNinja[index] = { ...initialNinja[index], ...updatedData };

//   return {
//     code: 200,
//     message: 'Data Ninja has successfully edited',
//     data: initialNinja,
//   };
// }
// ################################################ NON-DB-CODE ###################################################
