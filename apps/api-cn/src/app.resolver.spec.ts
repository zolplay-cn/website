import { Chance } from 'chance'

import { AppResolver } from './app.resolver'
import { AppService } from './app.service'

import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

const chance = new Chance()
const version = chance.string({ length: 6 })

describe('AppResolver', () => {
  let appResolver: AppResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'nest') {
                return { version }
              }

              return null
            }),
          },
        },
      ],
    }).compile()

    appResolver = app.get<AppResolver>(AppResolver)
  })

  describe('version', () => {
    it('should return version', () => {
      expect(appResolver.version()).toBe(version)
    })
  })
})
