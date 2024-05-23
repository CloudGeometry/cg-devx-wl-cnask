import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Invite } from './models/invite.model';
import { InviteService } from './invite.service';
import { InviteInput } from './dto/invite.input';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../user/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { Permissions } from '../common/decorators/permission.decorator';
import {
  PermissionAction,
  PermissionObjectType
} from '../role/models/role.model';

@Resolver(() => Invite)
export class InviteResolver {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.USER])
  @Query(() => [Invite], { description: 'Find all inactivated invites' })
  async invites(): Promise<Invite[]> {
    return this.inviteService.invites();
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.USER])
  @Query(() => Invite, { description: 'Get invite by id' })
  async invite(
    @Args('id', {
      type: () => String
    })
    id: string
  ) {
    return this.inviteService.invite(id);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.CREATE, PermissionObjectType.USER])
  @Mutation(() => Invite, { description: 'Create invite', nullable: true })
  async createInvite(
    @UserEntity() user: User,
    @Args('data') data: InviteInput
  ): Promise<Invite> {
    const url = await this.inviteService.sendConfirmationLink(
      data.email,
      data.tenantAlias
    );
    return this.inviteService.addInvite(data.email, url, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.USER])
  @Mutation(() => Invite, {
    description: 'Resend conformation link',
    nullable: true
  })
  async resendConfirmationLink(@Args('id') id: string): Promise<Invite> {
    return await this.inviteService.resendConfirmationLink(id);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.DELETE, PermissionObjectType.USER])
  @Mutation(() => Invite, { description: 'Delete invite', nullable: true })
  async deleteInvite(@Args('id') id: string): Promise<Invite> {
    return await this.inviteService.delete(id);
  }

  @Mutation(() => Invite, {
    description: 'Decode invite token',
    nullable: true
  })
  async decodeInviteToken(@Args('token') token: string): Promise<Invite> {
    return await this.inviteService.decodeSingUpToken(token);
  }
}
