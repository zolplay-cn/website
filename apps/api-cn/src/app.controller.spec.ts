import { Chance } from 'chance'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

const chance = new Chance()
const version = chance.string({ length: 6 })

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
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

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return version', () => {
      expect(appController.getVersion()).toMatchObject({ version })
    })
  })
})
