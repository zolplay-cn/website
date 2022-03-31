import { User } from '~/users/models/user.model'

import { Token } from './token.model'

import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth extends Token {
  user: User
}
