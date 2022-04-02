import { NestConfig } from '~/common/configs/config.interface'

import { AppService } from './app.service'

import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getVersion() {
    const { version } = this.configService.get<NestConfig>('nest')

    return {
      version,
    }
  }
}
