import { BaseModel } from '~/common/models/base.model'
import { User } from '~/users/models/user.model'

import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageComment extends BaseModel {
  content: string
  route: string
  user: User
}
