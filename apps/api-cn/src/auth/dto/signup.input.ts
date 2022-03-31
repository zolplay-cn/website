import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignupInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string

  @Field()
  @IsString()
  @IsNotEmpty()
  verificationCode: string

  @Field()
  @IsNotEmpty()
  @MaxLength(140)
  name: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string
}
