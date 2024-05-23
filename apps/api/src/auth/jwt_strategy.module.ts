import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy]
})
export class Jwt_strategyModule {}
