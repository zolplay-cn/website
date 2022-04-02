import { IsNotEmpty } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageCommentInput {
  @Field()
  @IsNotEmpty()
  content: string

  @Field()
  @IsNotEmpty()
  route: string
}
