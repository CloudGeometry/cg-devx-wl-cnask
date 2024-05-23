import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { UserEntity } from '../common/decorators/user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { description: 'Return current user' })
  async me(@UserEntity() user: User): Promise<User> {
    return await this.usersService.user(user.id);
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
}
