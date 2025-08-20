import { PrismaClient, type Prisma } from "@prisma/client"
import { hashPassword } from "@/utils/bcrypt"

const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
  {
    name: "فراز پورابراهیم",
    username: "farazpm82",
    email: "farazpourebrahimh@gmail.com",
    password: "123456",
  },
]

export async function main() {
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password)
    const existingUser = await prisma.user.findUnique({
      where: { username: user.username },
    })

    if (!existingUser) {
      await prisma.user.create({ data: { ...user, password: hashedPassword } })
    }
  }
}

if (require.main === module) {
  main()
      .catch((e) => {
        console.error(e)
        process.exit(1)
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
}
