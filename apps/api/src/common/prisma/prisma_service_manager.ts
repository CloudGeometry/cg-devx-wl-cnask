import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig, TenancyConfig } from '../configs/config.interface';
import { GraphQLError } from 'graphql/error';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';

const getSubdomain = (url: string, base_domain_name: string) => {
  if (!url) {
    return undefined;
  }
  let domain = url;
  if (url.includes('://')) {
    domain = url.split('://')[1];
  }

  if (base_domain_name) {
    if (!base_domain_name.startsWith('.')) {
      base_domain_name = `.${base_domain_name}`;
    }
    if (domain.includes(base_domain_name)) {
      const subdomain = domain.replace(base_domain_name, '');
      return subdomain;
    } else {
      return undefined;
    }
  } else {
    if (domain.split('.').length < 2) {
      return undefined;
    }
    const subdomain = domain.split('.')[0];
    return subdomain;
  }
};

@Injectable()
export class PrismaServiceManager implements OnModuleDestroy {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  private readonly defaultPrismaService: PrismaService = new PrismaService();
  private services: { [key: string]: PrismaService } = {};

  getClient(request?: any, tenantId?: string): PrismaService {
    // if tenancy is not enabled, return the default prisma service
    if (!this.configService.get<TenancyConfig>('tenancy').enabled) {
      return this.defaultPrismaService;
    }

    // if tenancy is enabled, tenantId is required
    if (!tenantId) {
      request = request?.req || request;
      if (request?.headers?.authorization && this.jwtService) {
        const token = request?.headers?.authorization.split(' ')[1];
        const decoded = this.jwtService.decode(token);
        tenantId = decoded['alias'];
      }
      tenantId =
        tenantId ||
        request?.headers['x-tenant-alias'] ||
        getSubdomain(
          request?.headers['origin'],
          this.configService.get('BASE_FQDN')
        ) ||
        this.configService.get('DB_DEFAULT_SCHEMA');
    }

    if (!tenantId) {
      throw new GraphQLError('TenantId is required when tenancy is enabled', {
        extensions: {
          code: 'BAD_USER_INPUT',
          argumentName: 'TenantId'
        }
      });
    }

    let service = this.services[tenantId];
    if (!service) {
      const db = this.configService.get<DatabaseConfig>('database');
      const databaseUrl = `postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}?schema=${tenantId}&sslmode=prefer`;
      service = new PrismaService({
        datasources: {
          db: {
            url: databaseUrl
          }
        }
      });
      this.services[tenantId] = service;
    }
    return service;
  }

  async onModuleDestroy() {
    // wait for every cached instance to be disposed
    await Promise.all(
      Object.values(this.services).map((service) => service.$disconnect())
    );
  }
}
