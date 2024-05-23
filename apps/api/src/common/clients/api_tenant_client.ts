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
import fetch from 'cross-fetch';

@Injectable()
export class ApiTenantClient {
  private readonly url: string;
  private readonly client: ApolloClient<any>;

  constructor(private readonly configService: ConfigService) {
    const appMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers
        }
      }));

      return forward(operation);
    });

    this.url = this.configService.get('TENANT_GRAPHQL_URL');
    const httpLink = new HttpLink({ uri: this.url, fetch });
    this.client = new ApolloClient<any>({
      link: concat(appMiddleware, httpLink),
      cache: new InMemoryCache()
    });
  }

  async bootstrapTenant({ id }: { id: string }) {
    try {
      const results = await this.client.mutate<{
        bootstrapTenant: { id: string; alias: string; email: string };
      }>({
        mutation: gql`mutation BootstrapTenant {
          bootstrapTenant(id: "${id}") {
            id
            alias
            email
          }
        }`
      });
      return { data: results?.data?.bootstrapTenant, errors: null };
    } catch (error) {
      return { errors: error, data: null };
    }
  }

  async decodeInviteToken(token: string) {
    try {
      const results = await this.client.mutate<{
        decodeInviteToken: { id: string; alias: string; email: string };
      }>({
        mutation: gql`mutation DecodeToken {
          decodeInviteToken(token: "${token}") {
            id
            alias
            email
          }
        }`
      });
      return { data: results?.data?.decodeInviteToken, errors: null };
    } catch (error) {
      return { errors: error, data: null };
    }
  }

  async verifyTenantAlias(alias: string) {
    try {
      const results = await this.client.query({
        query: gql`query TenantByAlias{
          getTenantByAlias(alias: "${alias}") {
            id
          }
        }`
      });
      return results;
    } catch (error) {
      return { errors: error };
    }
  }
}
