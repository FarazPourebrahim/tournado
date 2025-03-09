import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    name: "فراز پورابراهیم",
    username: "farazpm82",
    email: "farazpourebrahimh@gmail.com",
    password: "123456",
  },
];

export async function main() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main().then(() => console.log("Done!"));
