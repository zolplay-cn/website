import { IsJWT, IsNotEmpty } from 'class-validator'
import { GraphQLJWT } from 'graphql-scalars'

import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @Field(() => GraphQLJWT)
  token: string
}
