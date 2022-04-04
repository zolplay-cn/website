import { SecurityConfig } from '~/common/configs/config.interface'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { GqlAuthGuard } from './gql-auth.guard'
import { JwtStrategy } from './jwt.strategy'

import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
