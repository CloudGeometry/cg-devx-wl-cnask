import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Tenant } from './models/tenant.model';
import { User } from '../user/models/user.model';
import { UserEntity } from '../common/decorators/user.decorator';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { TenantService } from './tenant.service';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { RegistrateTenantInput } from './dto/registrate-tenant.input';

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Tenant], { description: 'Get all tenants' })
  async tenants(): Promise<Tenant[]> {
    return this.tenantService.getTenants();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Tenant, { description: 'Get tenant by id' })
  async tenant(
    @Args('id', {
      type: () => String
    })
    id: string
  ) {
    return this.tenantService.tenant(id);
  }

  @Mutation(() => Tenant, { description: 'Registrate tenant' })
  async registrateTenant(@Args('data') data: RegistrateTenantInput) {
    return this.tenantService.registrateTenant(data);
  }

  @Mutation(() => Tenant, {
    description: 'Decode invite token',
    nullable: true
  })
  async decodeInviteToken(@Args('token') token: string): Promise<Tenant> {
    return await this.tenantService.decodeSingUpToken(token);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Tenant, {
    description: 'Create Tenant database',
    nullable: true
  })
  async bootstrapTenant(@Args('id') id: string): Promise<Tenant> {
    return await this.tenantService.bootstrapTenant(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tenant, { description: 'Update tenant' })
  async updateTenant(
    @UserEntity() user: User,
    @Args('id', { type: () => String })
    id: string,
    @Args('data', { type: () => UpdateTenantInput })
    data: UpdateTenantInput
  ): Promise<Tenant> {
    return this.tenantService.updateTenant(user.id, id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tenant, { description: 'Delete tenant' })
  async deleteTenant(
    @Args('id', { type: () => String })
    id: string
  ): Promise<Tenant> {
    return this.tenantService.deleteTenant(id);
  }

  @Query(() => Tenant, { description: 'Get tenant by alias' })
  async getTenantByAlias(
    @Args('alias', { type: () => String })
    alias: string
  ): Promise<Tenant> {
    return this.tenantService.tenantByAlias(alias);
  }
}
