import { PrismaService } from 'nestjs-prisma'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

describe('AuthResolver', () => {
  let authResolver: AuthResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        PrismaService,
        { provide: JwtService, useValue: {} },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'security') {
                return {
                  expiresIn: '180d',
                  refreshIn: '180d',
                  bcryptSaltOrRound: 10,
                  sms: {
                    secretId: 'secretId',
                    secretKey: 'secretKey',
                    region: 'ap-shanghai',
                    appId: 'appId',
                    appKey: 'appKey',
                    signInTemplateId: 'signInTemplateId',
                    signUpTemplateId: 'signUpTemplateId',
                    signName: 'signName',
                  },
                }
              }

              return null
            }),
          },
        },
      ],
    }).compile()

    authResolver = app.get<AuthResolver>(AuthResolver)
  })

  describe('can send SMS code', () => {
    it('should be defined', () => {
      expect(authResolver.sendSmsCode).toBeDefined()
    })
  })
})
