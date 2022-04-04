import { BaseModel } from '~/common/models/base.model'
import { PageComment } from '~/page-comments/models/page-comment.model'

import { HideField, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User extends BaseModel {
  email?: string
  name?: string
  phone?: string
  teamLabel?: string
  pageComments: PageComment[]

  @HideField()
  password?: string

  @HideField()
  smsCode?: string
}
