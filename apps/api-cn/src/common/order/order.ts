import { OrderDirection } from './order-direction'

import { Field, InputType } from '@nestjs/graphql'

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(() => OrderDirection)
  direction: OrderDirection
}
