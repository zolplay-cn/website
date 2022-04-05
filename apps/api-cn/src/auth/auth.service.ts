import { Chance } from 'chance'
import dayjs from 'dayjs'
import { PrismaService } from 'nestjs-prisma'
import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_client'

import { SmsInput } from '~/auth/dto/sms.input'
import { SecurityConfig } from '~/common/configs/config.interface'

import { SignupInput } from './dto/signup.input'
import { Token } from './models/token.model'

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User, VerificationRequest } from '@prisma/client'

const smsExpirationMinutes = 10
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
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
    const code = await this.generateSmsCodeForUser(phone)

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
          TemplateParamSet: [code, smsExpirationMinutes.toString()],
          PhoneNumberSet: [phone],
        })
      default:
        throw new BadRequestException('无法发送短信')
    }
  }

  async generateSmsCodeForUser(phone: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })

    if (!user) {
      await this.prisma.user.create({
        data: {
          phone,
        },
      })
    }

    const code = new Chance().string({
      length: 4,
      pool: '0123456789',
    })

    const expiresAt = dayjs().add(smsExpirationMinutes, 'minute').toDate()
    const existingRequest = await this.prisma.verificationRequest.findFirst({
      where: {
        identifier: phone,
      },
    })
    if (existingRequest) {
      await this.prisma.verificationRequest.update({
        where: {
          id: existingRequest.id,
        },
        data: {
          token: code,
          expiresAt,
        },
      })
    } else {
      await this.prisma.verificationRequest.create({
        data: {
          token: code,
          identifier: phone,
          expiresAt,
        },
      })
    }

    return code
  }

  async signUp({ verificationCode, phone, name }: SignupInput): Promise<Token> {
    await this.findVerificationRequest(phone, verificationCode)
    const user = await this.revokeVerificationRequest(phone)

    if (user.name) {
      throw new BadRequestException('用户已存在')
    }

    await this.prisma.user.update({
      data: {
        name,
      },
      where: {
        id: user.id,
      },
    })

    return this.generateTokens({ userId: user.id })
  }

  async login(phone: string, verificationCode: string): Promise<Token> {
    await this.findVerificationRequest(phone, verificationCode)
    const { id, name } = await this.revokeVerificationRequest(phone)

    if (!name) {
      throw new BadRequestException('手机号不存在')
    }

    return this.generateTokens({
      userId: id,
    })
  }

  async findVerificationRequest(
    phone: string,
    code: string
  ): Promise<VerificationRequest> {
    const request = await this.prisma.verificationRequest.findFirst({
      where: {
        token: code,
        identifier: phone,
        expiresAt: { gt: dayjs().toDate() },
      },
    })

    if (!request) {
      throw new BadRequestException('验证码错误')
    }

    return request
  }

  async revokeVerificationRequest(phone: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    })
    await this.prisma.verificationRequest.deleteMany({
      where: {
        identifier: phone,
      },
    })

    return user
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
    const { expiresIn } = this.configService.get<SecurityConfig>('security')

    return this.jwtService.sign(payload, {
      expiresIn,
    })
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const { refreshIn } = this.configService.get<SecurityConfig>('security')
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: refreshIn,
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
