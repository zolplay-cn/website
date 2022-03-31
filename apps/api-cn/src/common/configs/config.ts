import type { Config } from './config.interface'

const config: Config = {
  nest: {
    port: 4000,
    version: '1.0.0',
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Zolplay API',
    description: 'The Zolplay API description',
    version: '1.0',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
}

export default (): Config => config
