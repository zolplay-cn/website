import { IsNotEmpty, Length, Matches } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @Matches(/^\+86(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])[0-9]{8}$/gm, {
    message: '手机号码格式不正确',
  })
  phone: string

  @Field()
  @IsNotEmpty()
  @Length(4, 4, { message: '验证码长度为4位' })
  verificationCode: string
}
