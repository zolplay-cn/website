export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  graphql: GraphqlConfig
  security: SecurityConfig
}

export interface NestConfig {
  port: number
  version: string
}

export interface CorsConfig {
  enabled: boolean
  origin: string
  credentials: boolean
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}

export interface GraphqlConfig {
  playgroundEnabled: boolean
  debug: boolean
  schemaDestination: string
  sortSchema: boolean
}

export interface SecurityConfig {
  expiresIn: string
  refreshIn: string
  bcryptSaltOrRound: string | number
  sms: {
    secretId: string
    secretKey: string
    region: string
    appId: string
    appKey: string
    signInTemplateId: string
    signUpTemplateId: string
    signName: string
  }
}
