import PaginatedResponse from '~/common/pagination/pagination'

import { PageComment } from './page-comment.model'

import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageCommentConnection extends PaginatedResponse(PageComment) {}
