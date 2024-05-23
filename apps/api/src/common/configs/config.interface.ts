export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
  tenancy: TenancyConfig;
  database: DatabaseConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface TenancyConfig {
  enabled: boolean;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
}
