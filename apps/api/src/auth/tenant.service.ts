import { Injectable } from '@nestjs/common';
import { ApiTenantClient } from 'common/clients/api_tenant_client';
import { DatabaseService } from 'common/scripts/create_new_db';
import { InviteService } from 'invite/invite.service';

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantClient: ApiTenantClient,
    private readonly db: DatabaseService,
    private readonly inviteService: InviteService
  ) {}

  public async confirmTenant(token: string) {
    const tenant = await this.tenantClient.decodeInviteToken(token);
    if (tenant.errors || !tenant.data) {
      throw new Error('Confirmation link is not valid or expired');
    }

    const bootstrapTenant = await this.tenantClient.bootstrapTenant(
      tenant.data
    );
    if (bootstrapTenant.errors) {
      throw new Error(bootstrapTenant.errors);
    }

    return true;
  }

  public async bootstrapTenant({
    alias,
    email
  }: {
    email: string;
    alias: string;
  }) {
    await this.db.create_db(alias);
    const url = await this.inviteService.sendConfirmationLink(email, alias);
    await this.inviteService.addAdminInvite(email, url, alias);

    return true;
  }
}
