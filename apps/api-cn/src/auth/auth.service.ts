import { Chance } from 'chance'
import { PrismaService } from 'nestjs-prisma'
import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_client'

import { SmsInput } from '~/auth/dto/sms.input'
import { SecurityConfig } from '~/common/configs/config.interface'

import { SignupInput } from './dto/signup.input'
import { Token } from './models/token.model'
import { PasswordService } from './password.service'

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async sendSMS({ phone, type }: SmsInput) {
    const {
      secretId,
      secretKey,
      region,
      appId,
      signInTemplateId,
      signUpTemplateId,
      signName,
    } = this.configService.get<SecurityConfig>('security').sms
    const user = await this.saveSmsCodeForUser(phone)

    const client = new Client({
      credential: {
        secretId,
        secretKey,
      },
      region,
      profile: {
        language: 'zh-CN',
      },
    })

    switch (type) {
      case 'sign_in':
      case 'sign_up':
        return client.SendSms({
          SmsSdkAppId: appId,
          SignName: signName,
          TemplateId: type === 'sign_in' ? signInTemplateId : signUpTemplateId,
          TemplateParamSet: [user.smsCode],
          PhoneNumberSet: [phone],
        })
      default:
        throw new BadRequestException('无法发送短信')
    }
  }

  async saveSmsCodeForUser(phone: string): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
          name: '',
        },
      })
    }

    const chance = new Chance()

    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        smsCode: chance.string({
          length: 4,
          pool: '0123456789',
        }),
      },
    })
  }

  async signUp({ verificationCode, phone, name }: SignupInput): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })

    if (user.smsCode !== verificationCode) {
      throw new BadRequestException('验证码错误')
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        smsCode: null,
      },
    })

    return this.generateTokens({ userId: user.id })
  }

  async login(phone: string, verificationCode: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { phone } })

    if (!user) {
      throw new NotFoundException(`不存在该手机号: ${phone} 用户`)
    }

    const codeValid = user.smsCode === verificationCode

    if (!codeValid) {
      throw new BadRequestException('验证码错误')
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        smsCode: null,
      },
    })

    return this.generateTokens({
      userId: user.id,
    })
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId']
    return this.prisma.user.findUnique({ where: { id } })
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload)
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security')
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    })
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      })

      return this.generateTokens({
        userId,
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
