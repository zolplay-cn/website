import { IsNotEmpty } from 'class-validator'

import { ArgsType } from '@nestjs/graphql'

@ArgsType()
export class PageCommentId {
  @IsNotEmpty()
  pageCommentId: string
}
