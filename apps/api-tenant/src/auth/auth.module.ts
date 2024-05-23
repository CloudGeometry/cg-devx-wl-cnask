import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { SecurityConfig } from '../common/configs/config.interface';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    GqlAuthGuard,
    PasswordService,
    JwtModule,
    JwtStrategy
  ],
  exports: [GqlAuthGuard]
})
export class AuthModule {}
