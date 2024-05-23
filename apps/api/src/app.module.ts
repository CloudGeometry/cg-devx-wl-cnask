import config from './common/configs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './items/item.module';
import { GraphQLError } from 'graphql/error';
import { CaslModule } from './common/casl/casl.module';
import { RoleModule } from './role/role.module';
import { EmailModule } from './common/email/email.module';
import { InviteModule } from './invite/invite.module';
import { ServicesModule } from './common/services/services.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { PrismaService } from './common/prisma/prisma.service';
import { Jwt_strategyModule } from './auth/jwt_strategy.module';
import { HealthModule } from './common/health/health.module';
import { PromModule } from './common/graphql_metrics/prom.module';

@Module({
  imports: [
    HealthModule,
    PromModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
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
    CaslModule,
    AuthModule,
    UserModule,
    ItemModule,
    RoleModule,
    EmailModule,
    InviteModule,
    ServicesModule,
    Jwt_strategyModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
