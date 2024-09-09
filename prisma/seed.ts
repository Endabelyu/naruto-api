import { PrismaClient } from '@prisma/client';
import { ninjas } from './ninja.seed';

const prisma = new PrismaClient();

async function main() {
  for (const ninjaData of ninjas) {
    const { name, family, clan, village } = ninjaData;

    // Create or find Village
    const villageRecord = await prisma.village.upsert({
      where: { name: village },
      update: {},
      create: { name: village },
    });

    // Create or find Family
    const familyRecord = await prisma.family.upsert({
      where: { name: family },
      update: {},
      create: { name: family },
    });

    // Create or find Clan
    const clanRecord = await prisma.clan.upsert({
      where: { name: clan },
      update: {},
      create: { name: clan },
    });

    // Create Ninja
    await prisma.ninja.create({
      data: {
        name,
        village_id: villageRecord.id,
        family_id: familyRecord.id,
        clan_id: clanRecord.id,
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
