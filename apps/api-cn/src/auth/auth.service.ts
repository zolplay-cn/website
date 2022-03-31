import { PrismaService } from 'nestjs-prisma'

import { SecurityConfig } from '~/common/configs/config.interface'

import { SignupInput } from './dto/signup.input'
import { Token } from './models/token.model'
import { PasswordService } from './password.service'

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async createUser({
    // eslint-disable-next-line unused-imports/no-unused-vars
    verificationCode,
    phone,
    name,
    // eslint-disable-next-line unused-imports/no-unused-vars
    ...rest
  }: SignupInput): Promise<Token> {
    // const hashedPassword = await this.passwordService.hashPassword(
    //   payload.password
    // )
    // TODO: check verification code

    try {
      const user = await this.prisma.user.create({
        data: {
          phone,
          name,
        },
      })

      return this.generateTokens({
        userId: user.id,
      })
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`手机号 ${phone} 已被注册`)
      } else {
        throw new Error(e)
      }
    }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  async login(phone: string, verificationCode: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { phone } })

    if (!user) {
      throw new NotFoundException(`不存在该手机号: ${phone} 用户`)
    }

    // TODO: check verification code
    const codeValid = true

    if (!codeValid) {
      throw new BadRequestException('验证码错误')
    }

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
