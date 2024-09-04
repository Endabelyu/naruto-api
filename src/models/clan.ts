import { Clan, PrismaClient } from '@prisma/client';
import { handlePrismaError, PrismaError } from '../utils/prismaErrorsUtils';
import { formatName } from '../utils/formatTextUtils';

export const prisma = new PrismaClient();

export type Response = {
  data?: Clan;
  dataGet?: Clan[];
  code: number;
  message?: string;
};
export async function getAllClans(): Promise<Clan[]> {
  return await prisma.clan.findMany();
}

export async function getClanByName(name: string): Promise<Response> {
  try {
    const clans = await prisma.clan.findMany({
      where: {
        name: {
          contains: name, // This will search for any record where 'name' includes the given substring
          mode: 'insensitive', // This makes the search case-insensitive
        },
      },
    });

    if (clans.length === 0) {
      return {
        code: 404,
        message: 'No clans found matching the name parameters.',
      };
    }

    return {
      code: 200,
      dataGet: clans,
    };
  } catch (error) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function createClan(name: string): Promise<Response> {
  const checkClan = await prisma.clan.findUnique({ where: { name } });
  console.log(name, typeof name, checkClan, 'check');
  if (checkClan) {
    return {
      code: 409,
    };
  }

  return {
    data: await prisma.clan.create({ data: { name: name } }),
    code: 201,
  };
}

export async function editClanByName(
  name: string,
  payload: string,
): Promise<Response> {
  try {
    const names = formatName(name);
    console.log(names, payload, 'namess');

    const updateClan = await prisma.clan.update({
      where: {
        name: names,
      },
      data: { name: payload },
    });
    if (!updateClan) {
      return {
        code: 404,
        message: 'No clans found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Clan data updated successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}

export async function deleteClanByName(name: string): Promise<Response> {
  try {
    const deleteUser = await prisma.clan.delete({
      where: {
        name: name,
      },
    });
    console.log(deleteUser, 'deltess');
    if (!deleteUser) {
      return {
        code: 404,
        message: 'No clans found matching the name parameters.',
      };
    }

    return {
      code: 200,
      message: 'Clan data deleted successfully!',
    };
  } catch (error: any) {
    return handlePrismaError(error as PrismaError);
  }
}
