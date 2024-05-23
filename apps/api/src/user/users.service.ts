import { Injectable } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PasswordService } from '../auth/password.service';
import { Profile } from './models/profile.model';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { UpdateUserRoleInput } from './dto/update-role.input';
import { User } from './models/user.model';
import { UserFilterInput } from './dto/filter-users.input';
import { safeDelete, safeRecovery } from '../common/utils/safe.filter';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async users(filter?: UserFilterInput): Promise<User[]> {
    let where = {};
    if (filter?.userFirstLastName) {
      const profiles = await this.prisma.profile.findMany({
        select: {
          userId: true
        },
        where: {
          OR: [
            {
              firstname: {
                contains: filter.userFirstLastName,
                mode: 'insensitive'
              }
            },
            {
              lastname: {
                contains: filter.userFirstLastName,
                mode: 'insensitive'
              }
            }
          ]
        }
      });
      where = {
        id: { in: profiles.map((profile) => profile.userId) }
      };
    }
    return await this.prisma.user.findMany({
      include: {
        profile: true
      },
      where,
      orderBy: {
        profile: {
          lastname: 'asc'
        }
      }
    });
  }

  async updateProfile(
    userId: string,
    currentUserId: string,
    newUserData: UpdateProfileInput
  ): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      where: { userId }
    });

    if (!profile) {
      throw new BadUserInputError(
        `No profile found for user id: ${userId}`,
        'userId'
      );
    }
    return await this.prisma.profile.update({
      data: {
        ...newUserData,
        user: {
          update: {
            updatedById: currentUserId
          }
        }
      },
      where: {
        userId
      },
      include: {
        user: true
      }
    });
  }

  async updateUserRole(
    userId: string,
    currentUserId: string,
    newUserData: UpdateUserRoleInput
  ): Promise<User> {
    if (userId === currentUserId) {
      throw new BadUserInputError('User cannot edit their role', 'userId');
    }
    const user = await this.prisma.user.findFirst({
      where: { id: userId }
    });

    if (!user) {
      throw new BadUserInputError(`No user found for id: ${userId}`, 'userId');
    }
    return await this.prisma.user.update({
      data: {
        ...newUserData,
        updatedById: currentUserId
      },
      where: { id: userId }
    });
  }

  async activateUser(
    userId: string,
    currentUserId: string,
    activate: boolean
  ): Promise<User> {
    if (userId === currentUserId) {
      throw new BadUserInputError('User cannot delete themselves', 'userId');
    }
    const user = await this.prisma.user.findFirst({
      where: { id: userId }
    });

    if (!user) {
      throw new BadUserInputError(`No user found for id: ${userId}`, 'userId');
    }
    console.log(userId);
    if (!activate) {
      return await safeDelete<User>(this.prisma, 'user', userId);
    } else {
      return await safeRecovery<User>(this.prisma, 'user', userId);
    }
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
