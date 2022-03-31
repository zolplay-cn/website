import { PrismaService } from 'nestjs-prisma'

import { GqlAuthGuard } from '~/auth/gql-auth.guard'
import { UserEntity } from '~/common/decorators/user.decorator'
import { PageComment } from '~/page-comments/models/page-comment.model'

import { ChangePasswordInput } from './dto/change-password.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './models/user.model'
import { UsersService } from './users.service'

import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    )
  }

  @ResolveField('pageComments', () => [PageComment])
  pageComments(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } })
      .pageComments
  }
}
