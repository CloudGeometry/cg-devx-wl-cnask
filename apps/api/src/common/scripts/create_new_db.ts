import { execSync } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaServiceManager } from '../prisma/prisma_service_manager';
import {
  admin_permissions,
  user_items_all_permissions
} from '../utils/permissions';

const seed_default_data = async (alias: string, cs: ConfigService) => {
  const prismaServiceManager = new PrismaServiceManager(cs, null);
  const prisma = await prismaServiceManager.getClient(null, alias);
  await prisma.role.create({
    data: {
      name: 'USER',
      permissions: user_items_all_permissions
    }
  });
  await prisma.role.create({
    data: {
      name: 'ADMIN',
      permissions: admin_permissions
    }
  });
};

@Injectable()
export class DatabaseService {
  private readonly url: string;

  constructor(readonly configService: ConfigService) {
    const fullDbUrl = configService.get('DATABASE_URL');
    // get db connection without schema and extra args
    this.url = fullDbUrl.split('?')[0];
  }

  async create_db(alias: string): Promise<boolean> {
    execSync(
      `export DATABASE_URL=${this.url}?schema=${alias} && npx prisma migrate deploy`,
      { stdio: 'inherit' }
    );
    // used to set default roles
    await seed_default_data(alias, this.configService);
    return true;
  }
}
