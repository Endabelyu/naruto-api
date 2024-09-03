import { PrismaClient, Village } from '@prisma/client';
import { handlePrismaError, PrismaError } from '../utils/prismaErrorsUtils';
import { formatName } from '../utils/formatTextUtils';

export const prisma = new PrismaClient();

export type Response = {
  data?: Village;
  dataGet?: Village[];
  code: number;
  message?: string;
};
export async function getVillage(): Promise<Village[]> {
  return await prisma.village.findMany();
}

export async function getVillageByName(name: string): Promise<Response> {
  try {
    const villages = await prisma.village.findMany({
      where: {
        name: {
          contains: name, // This will search for any record where 'name' includes the given substring
          mode: 'insensitive', // This makes the search case-insensitive
        },
      },
    });

    if (villages.length === 0) {
      return {
        code: 404,
        message: 'No villages found matching the name parameters.',
      };
    }

    return {
      code: 200,
      dataGet: villages,
    };
  } catch (error) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function createVillage(name: string): Promise<Response> {
  const checkVillage = await prisma.village.findUnique({ where: { name } });
  if (checkVillage) {
    return {
      code: 409,
    };
  }

  return {
    data: await prisma.village.create({ data: { name: name } }),
    code: 201,
  };
}

export async function editVillageByName(
  name: string,
  payload: string,
): Promise<Response> {
  try {
    const names = formatName(name);

    const updateVillage = await prisma.village.update({
      where: {
        name: names,
      },
      data: { name: payload },
    });
    if (!updateVillage) {
      return {
        code: 404,
        message: 'No villages found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Village data updated successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function deleteVillageByName(name: string): Promise<Response> {
  try {
    const deleteUser = await prisma.village.delete({
      where: {
        name: name,
      },
    });
    if (!deleteUser) {
      return {
        code: 404,
        message: 'No villages found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Village data deleted successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}
