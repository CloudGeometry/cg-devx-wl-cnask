import { Injectable } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { PasswordService } from '../auth/password.service';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { User } from './models/user.model';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async user(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id }
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadUserInputError('Invalid password', 'password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword
      },
      where: { id: userId }
    });
  }
}
