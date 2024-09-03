import { Family, PrismaClient } from '@prisma/client';
import { handlePrismaError, PrismaError } from '../utils/prismaErrorsUtils';
import { formatName } from '../utils/formatTextUtils';

export const prisma = new PrismaClient();

export type Response = {
  data?: Family;
  dataGet?: Family[];
  code: number;
  message?: string;
};
export async function getFamily(): Promise<Family[]> {
  return await prisma.family.findMany();
}

export async function getFamilyByName(name: string): Promise<Response> {
  try {
    const families = await prisma.family.findMany({
      where: {
        name: {
          contains: name, 
          mode: 'insensitive', 
        },
      },
    });

    if (families.length === 0) {
      return {
        code: 404,
        message: 'No families found matching the name parameters.',
      };
    }

    return {
      code: 200,
      dataGet: families,
    };
  } catch (error) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function createFamily(name: string): Promise<Response> {
  const checkFamily = await prisma.family.findUnique({ where: { name } });
  if (checkFamily) {
    return {
      code: 409,
    };
  }

  return {
    data: await prisma.family.create({ data: { name: name } }),
    code: 201,
  };
}

export async function editFamilyByName(
  name: string,
  payload: string,
): Promise<Response> {
  try {
    const names = formatName(name);

    const updateFamily = await prisma.family.update({
      where: {
        name: names,
      },
      data: { name: payload },
    });
    if (!updateFamily) {
      return {
        code: 404,
        message: 'No families found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Family data updated successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function deleteFamilyByName(name: string): Promise<Response> {
  try {
    const deleteUser = await prisma.family.delete({
      where: {
        name: name,
      },
    });
    if (!deleteUser) {
      return {
        code: 404,
        message: 'No families found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Family data deleted successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}
