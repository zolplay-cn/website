import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.pageComment.deleteMany()

  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      phone: '13012345678',
      name: 'Cali',
      email: 'cali@zolplay.cn',
    },
  })
  const user2 = await prisma.user.create({
    data: {
      phone: '13112345678',
      name: 'Timx',
      email: 'timx@zolplay.cn',
    },
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
