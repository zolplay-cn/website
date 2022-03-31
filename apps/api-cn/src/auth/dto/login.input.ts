import { IsNotEmpty } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  phone: string

  @Field()
  @IsNotEmpty()
  verificationCode: string
}
