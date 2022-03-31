import { GraphQLJWT } from 'graphql-scalars'

import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Token {
  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string

  @Field(() => GraphQLJWT, { description: 'JWT refresh token' })
  refreshToken: string
}
