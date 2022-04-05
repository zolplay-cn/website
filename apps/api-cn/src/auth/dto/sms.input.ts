import { IsIn, IsNotEmpty, Matches } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SmsInput {
  @Field()
  @IsNotEmpty()
  @Matches(/^\+86(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])[0-9]{8}$/, {
    message: '手机号码格式不正确',
  })
  phone: string

  @Field()
  @IsNotEmpty()
  @IsIn(['sign_in', 'sign_up'], { message: '短信类型不正确' })
  type: 'sign_in' | 'sign_up'
}
