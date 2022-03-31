import { IsNotEmpty, MinLength } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string
}
