import { PubSub } from 'graphql-subscriptions'
import { PrismaService } from 'nestjs-prisma'

import { GqlAuthGuard } from '~/auth/gql-auth.guard'
import { UserEntity } from '~/common/decorators/user.decorator'
import { User } from '~/users/models/user.model'

import { PageCommentId } from './args/page-comment-id.args'
import { CreatePageCommentInput } from './dto/createPageComment.input'
import { PageComment } from './models/page-comment.model'

import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql'

const pubSub = new PubSub()

@Resolver(() => PageComment)
export class PageCommentsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => PageComment)
  postCreated() {
    return pubSub.asyncIterator('pageCommentCreated')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PageComment)
  async createPageComments(
    @UserEntity() user: User,
    @Args('data') data: CreatePageCommentInput
  ) {
    const newComment = this.prisma.pageComment.create({
      data: {
        route: '',
        content: data.content,
        userId: user.id,
      },
    })
    pubSub.publish('pageCommentCreated', { pageCommentCreated: newComment })

    return newComment
  }

  @Query(() => PageComment)
  async post(@Args() id: PageCommentId) {
    return this.prisma.pageComment.findUnique({
      where: { id: id.pageCommentId },
    })
  }

  @ResolveField('user', () => User)
  async user(@Parent() post: PageComment) {
    return this.prisma.pageComment.findUnique({ where: { id: post.id } }).user()
  }
}
