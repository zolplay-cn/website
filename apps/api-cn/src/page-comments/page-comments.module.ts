import { PageCommentsResolver } from './page-comments.resolver'

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  providers: [PageCommentsResolver],
})
export class PageCommentsModule {}
