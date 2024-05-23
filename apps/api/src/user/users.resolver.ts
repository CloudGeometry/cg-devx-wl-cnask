import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UserEntity } from '../common/decorators/user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { Profile } from './models/profile.model';
import { UpdateUserRoleInput } from './dto/update-role.input';
import { Permissions } from '../common/decorators/permission.decorator';
import {
  PermissionAction,
  PermissionObjectType
} from '../role/models/role.model';
import { UserFilterInput } from './dto/filter-users.input';
import S3Service from '../common/services/s3.service';
import { PrismaService } from '../common/prisma/prisma.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private s3service: S3Service,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { description: 'Find a single user by ID' })
  async me(@UserEntity() user: User): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true
      }
    });
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.USER])
  @Query(() => [User], { description: 'Find all users' })
  async users(
    @Args('filter', { nullable: true }) where?: UserFilterInput
  ): Promise<User[]> {
    return this.usersService.users(where);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.PROFILE])
  @Mutation(() => Profile, { description: 'Update user profile' })
  async updateProfile(
    @UserEntity() user: User,
    @Args('id') userId: string,
    @Args('data') newUserData: UpdateProfileInput
  ): Promise<Profile> {
    return await this.usersService.updateProfile(userId, user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.PERMISSION])
  @Mutation(() => User, { description: 'Update user role' })
  async updateUserRole(
    @UserEntity() user: User,
    @Args('id') userId: string,
    @Args('data') newUserData: UpdateUserRoleInput
  ): Promise<User> {
    return await this.usersService.updateUserRole(userId, user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { description: 'Change user password' })
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return await this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.PROFILE])
  @Mutation(() => User, { description: 'Deactivate user' })
  async deactivateUser(@UserEntity() user: User, @Args('id') userId: string) {
    return await this.usersService.activateUser(userId, user.id, false);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.PROFILE])
  @Mutation(() => User, { description: 'Activate user' })
  async activateUser(@UserEntity() user: User, @Args('id') userId: string) {
    return await this.usersService.activateUser(userId, user.id, true);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => String, { description: 'Get signed url' })
  async getUploadUrl(@Args('imageFormat') imageFormat?: string) {
    return await this.s3service.getUploadUrl(imageFormat);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('items')
  items(@Parent() user: User) {
    return this.prisma.user
      .findUnique({ where: { id: user.id } })
      .createdItems();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('profile')
  profile(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).profile();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('role')
  role(@Parent() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).role();
  }
}
