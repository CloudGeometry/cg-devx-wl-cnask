import type { Config } from './config.interface';

export const config: Config = {
  nest: {
    port: parseInt(process.env.PORT ?? '3000', 10)
  },
  cors: {
    enabled: true
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true
  },
  security: {
    expiresIn: '360m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10
  },
  //TODO: change this to your own config
  tenancy: {
    enabled: true
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DEFAULT_DB,
    schema: process.env.DB_DEFAULT_SCHEMA
  }
};

export default (): Config => config;
