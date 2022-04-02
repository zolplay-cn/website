import type { Config } from './config.interface'

const config: Config = {
  nest: {
    port: 4000,
    version: '1.0.0',
  },
  cors: {
    enabled: true,
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
  swagger: {
    enabled: true,
    title: 'Zolplay API',
    description: 'The Zolplay API description',
    version: '1.0',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '180d',
    refreshIn: '90d',
    bcryptSaltOrRound: 10,
    sms: {
      secretId: process.env.SMS_SECRET_ID || '',
      secretKey: process.env.SMS_SECRET_KEY || '',
      region: process.env.SMS_REGION || 'ap-shanghai',
      appId: process.env.SMS_APP_ID || '',
      appKey: process.env.SMS_APP_KEY || '',
      signInTemplateId: process.env.SMS_SIGN_IN_TEMPLATE_ID || '',
      signUpTemplateId: process.env.SMS_SIGN_UP_TEMPLATE_ID || '',
      signName: process.env.SMS_SIGN_NAME || '',
    },
  },
}

export default (): Config => config
