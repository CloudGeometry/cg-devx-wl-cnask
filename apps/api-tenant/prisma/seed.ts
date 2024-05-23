import { PrismaClient } from '@prisma/client';
import { PasswordService } from '../src/auth/password.service';
import { ConfigService } from '@nestjs/config';
import { config } from '../src/common/configs/config';

const prisma = new PrismaClient();
const configService = new ConfigService(config);
const passwordService = new PasswordService(configService);

async function main() {
  console.log('Seeding...');

  const admin = await prisma.user.upsert({
    create: {
      username: 'admin',
      password: await passwordService.hashPassword(process.env.INIT_ADMIN_PASSWORD)
    },
    update: {},
    where: { username: 'admin' }
  });

  console.log({ admin: admin.username });

  const default_tenant = await prisma.tenant.upsert({
    create: {
      alias: configService.get('APP_DEFAULT_SCHEMA'),
      email: 'admin@cloudgeometry.io',
      createdById: admin.id
    },
    update: {},
    where: { alias: configService.get('APP_DEFAULT_SCHEMA'), }
  });

  console.log({ tenant: default_tenant });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
