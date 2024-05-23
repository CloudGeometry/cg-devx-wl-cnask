import { PrismaClient } from '@prisma/client';
import { PasswordService } from '../src/auth/password.service';
import { ConfigService } from '@nestjs/config';
import { config } from '../src/common/configs/config';
import {
  admin_permissions,
  user_items_all_permissions,
  user_read_permissions
} from '../src/common/utils/permissions';

const prisma = new PrismaClient();
const configService = new ConfigService(config);
const passwordService = new PasswordService(configService);

async function main() {
  console.log('Seeding...');

  const items_data = [
    {
      title: 'Task 1',
      description: 'Task 1 description',
      dueDate: new Date(),
      updatedById: null
    },
    {
      title: 'Task 2',
      description: 'Task 2 description',
      dueDate: new Date(),
      updatedById: null
    },
    {
      title: 'Task 3',
      description: 'Task 3 description',
      dueDate: new Date(),
      updatedById: null
    }
  ];

  const default_role = await prisma.role.upsert({
    create: {
      name: 'USER',
      permissions: user_items_all_permissions
    },
    update: {},
    where: { name: 'USER' }
  });

  console.log({ role: default_role.name });

  const admin_role = await prisma.role.upsert({
    create: {
      name: 'ADMIN',
      permissions: admin_permissions
    },
    update: {},
    where: { name: 'ADMIN' }

  });

  const admin = await prisma.user.upsert({
    create: {
      username: 'admin',
      password: await passwordService.hashPassword(
        process.env.INIT_ADMIN_PASSWORD
      ),
      role: { connect: { id: admin_role.id } }
    },
    update: {},
    where: { username: 'admin' }
  });

  const admin_user_profile = await prisma.profile.upsert(
    {
      create: {
        email: 'admin@cloudgeometry.io',
        firstname: 'Admin',
        lastname: 'Test',
        user: { connect: { id: admin.id } }
      },
      update: {},
      where: { email: 'admin@cloudgeometry.io' }
    }
  );

  console.log({ admin: admin.username });

  const readonly_role = await prisma.role.upsert({
    create: {
      name: 'READ_ONLY_USER',
      permissions: user_read_permissions
    },
    update: {},
    where: { name: 'READ_ONLY_USER' }

  });

  const readonly_user = await prisma.user.upsert({
    create: {
      username: 'readonly_user',
      password: await passwordService.hashPassword(
        process.env.INIT_ADMIN_PASSWORD
      ),
      role: { connect: { id: readonly_role.id } }
    },
    update: {},
    where: { username: 'readonly_user' }
  });

  const readonly_user_profile = await prisma.profile.upsert(
    {
      create: {
        email: 'readonly_user@cloudgeometry.io',
        firstname: 'User1',
        lastname: 'Test1',
        user: { connect: { id: readonly_user.id } }
      },
      update: {},
      where: { email: 'readonly_user@cloudgeometry.io' }
    }
  );

  console.log({ user: readonly_user.username });

  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.upsert({
      create: {
        username: `test_user_${i}`,
        password: await passwordService.hashPassword(
          process.env.INIT_ADMIN_PASSWORD
        ),
        createdItems: {
          create: items_data
        },
        role: { connect: { id: default_role.id } }
      },
      update: {},
      where: { username: `test_user_${i}` }
    });

    const user_profile = await prisma.profile.upsert(
      {
        create: {
          email: `user${i}@cloudgeometry.io`,
          firstname: `User${i}`,
          lastname: `Test${i}`,
          user: { connect: { id: user.id } }
        },
        update: {},
        where: { email: 'readonly_user@cloudgeometry.io' }
      });

    console.log({ user: user.username });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
