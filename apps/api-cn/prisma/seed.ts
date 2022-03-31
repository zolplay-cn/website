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
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  })
  const user2 = await prisma.user.create({
    data: {
      phone: '13112345678',
      name: 'Bart',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
