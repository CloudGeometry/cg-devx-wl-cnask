import {
  ApolloClient,
  ApolloLink,
  concat,
  gql,
  HttpLink,
  InMemoryCache
} from '@apollo/client/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Tenant } from '../../tenant/models/tenant.model';
import fetch from 'cross-fetch';

@Injectable()
export class ApiAppClient {
  private readonly url: string;
  private readonly client: ApolloClient<any>;

  constructor(
    public tenant: Tenant,
    private readonly configService: ConfigService
  ) {
    const tenantMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          'x-tenant-alias': tenant.alias
        }
      }));

      return forward(operation);
    });
    this.url = this.configService.get('APP_GRAPHQL_URL');
    const httpLink = new HttpLink({ uri: this.url, fetch });
    this.client = new ApolloClient<any>({
      link: concat(tenantMiddleware, httpLink),
      cache: new InMemoryCache()
    });
  }

  async bootstrapTenant() {
    const results = await this.client.mutate({
      mutation: gql`mutation bootstrapTenant{
        bootstrapTenant(email: "${this.tenant.email}", alias: "${this.tenant.alias}")
      }`
    });
    return results;
  }
}
