import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from '../user/models/user.model';
import { CreateUserInput } from './dto/create.user.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth, { description: 'Create user' })
  async signup(@Args('data') data: CreateUserInput) {
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken
    };
  }

  @Mutation(() => Auth, { description: 'Login user, return token' })
  async login(@Args('data') input: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(input);

    return {
      accessToken,
      refreshToken
    };
  }

  @Mutation(() => Token, { description: 'Refresh token' })
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
