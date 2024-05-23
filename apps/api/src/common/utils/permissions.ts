import { Prisma } from '@prisma/client';
export const admin_permissions = [
  { action: 'manage', subject: 'all' }
] as Prisma.JsonArray;

export const user_read_permissions = [
  { action: 'read', subject: 'Item' },
  { action: 'read', subject: 'Profile' },
  { action: 'read', subject: 'User' },
  { action: 'read', subject: 'Role' }
] as Prisma.JsonArray;

export const user_items_all_permissions = [
  { action: 'read', subject: 'Item', conditions: { createdById: '${userId}' } },
  { action: 'create', subject: 'Item' },
  {
    action: 'update',
    subject: 'Item',
    conditions: { createdById: '${userId}' }
  },
  {
    action: 'delete',
    subject: 'Item',
    conditions: { createdById: '${userId}' }
  },
  { action: 'read', subject: 'User' },
  { action: 'read', subject: 'Profile' },
  { action: 'update', subject: 'Profile', conditions: { userId: '${userId}' } },
  { action: 'read', subject: 'Role' }
] as Prisma.JsonArray;
