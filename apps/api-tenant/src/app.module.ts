import config from './common/configs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLError } from 'graphql/error';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';
import { HealthModule } from './common/health/health.module';
import { PromModule } from './common/graphql_metrics/prom.module';

@Module({
  imports: [
    HealthModule,
    PromModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log'
          })
        ]
      }
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      useFactory: () => ({
        autoSchemaFile: './src/schema.graphql',
        autoGenerateSchemaFile: true,
        formatError: (error: GraphQLError) => {
          if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
            console.error(error);
          }
          return error;
        }
      })
    }),
    AuthModule,
    UserModule,
    TenantModule
  ],
  providers: [AppService]
})
export class AppModule {}
