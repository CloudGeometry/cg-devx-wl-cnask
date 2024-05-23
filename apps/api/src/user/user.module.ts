import { Module } from '@nestjs/common';
import { UsersResolver } from '../user/users.resolver';
import { UsersService } from '../user/users.service';
import { PasswordService } from '../auth/password.service';
import { ServicesModule } from '../common/services/services.module';
import { prismaServiceProvider } from '../common/prisma/prisma.service';

@Module({
  imports: [ServicesModule],
  providers: [
    UsersResolver,
    UsersService,
    PasswordService,
    prismaServiceProvider
  ]
})
export class UserModule {}
