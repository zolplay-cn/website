import { SmsInput } from '~/auth/dto/sms.input'
import { User } from '~/users/models/user.model'

import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { RefreshTokenInput } from './dto/refresh-token.input'
import { SignupInput } from './dto/signup.input'
import { Auth } from './models/auth.model'
import { Token } from './models/token.model'

import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Boolean)
  async sendSmsCode(@Args('data') data: SmsInput): Promise<boolean> {
    const res = await this.auth.sendSMS(data)

    return !!res.RequestId
  }

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      data.phone,
      data.verificationCode
    )
    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Auth)
  async login(@Args('data') { phone, verificationCode }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      phone,
      verificationCode
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token)
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken)
  }
}
