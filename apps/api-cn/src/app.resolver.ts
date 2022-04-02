import { NestConfig } from '~/common/configs/config.interface'

import { ConfigService } from '@nestjs/config'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
  constructor(private readonly configService: ConfigService) {}

  @Query(() => String)
  version(): string {
    return this.configService.get<NestConfig>('nest').version
  }
}
