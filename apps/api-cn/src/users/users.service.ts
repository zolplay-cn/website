import { PrismaService } from 'nestjs-prisma'

import { UpdateUserInput } from './dto/update-user.input'

import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    })
  }
}
