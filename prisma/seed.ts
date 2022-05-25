import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "lord.farquad@swamp.me";
  const name = "Lord Markiloz Maximus 'Bogovski' Ferdo Farquaad";
  const street = "1 Castle Lane";
  const city = "Duloc City";
  const state = "Orinion";

  // cleanup the existing database
  await Promise.all([
    prisma.contact.deleteMany(),
    prisma.address.deleteMany(),
  ]).catch(() => {
    /* is ok */
  });

  await prisma.contact.create({
    data: {
      email,
      name,
      address: {
        create: {
          street,
          city,
          state,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
