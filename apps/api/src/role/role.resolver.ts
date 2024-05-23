import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'common/guards/gql-auth.guard';
import { UpdateRoleInput } from './dto/update-role.input';
import { CreateRoleInput } from './dto/create-role.input';
import { RoleService } from './role.service';
import { Permissions } from '../common/decorators/permission.decorator';
import {
  PermissionAction,
  PermissionObjectType,
  Role
} from './models/role.model';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.PERMISSION])
  @Query(() => [Role], { description: 'Get roles' })
  async roles(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.CREATE, PermissionObjectType.PERMISSION])
  @Mutation(() => Role, { description: 'Add role' })
  async addRole(@Args('data') data: CreateRoleInput): Promise<Role> {
    return this.roleService.addRole(data);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.PERMISSION])
  @Mutation(() => Role, { description: 'Update role' })
  async updateRole(
    @Args('id', { type: () => String })
    id: string,
    @Args('data', { type: () => UpdateRoleInput })
    data: UpdateRoleInput
  ): Promise<Role> {
    return this.roleService.updateRole(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.DELETE, PermissionObjectType.PERMISSION])
  @Mutation(() => Role, { description: 'Delete role' })
  async deleteRole(
    @Args('id', { type: () => String })
    id: string
  ): Promise<Role> {
    return this.roleService.deleteRole(id);
  }
}
