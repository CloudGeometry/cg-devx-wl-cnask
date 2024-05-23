import { BaseState } from '../models/base.model';
import { PrismaClient } from '@prisma/client';

export function safeDelete<T>(
  prisma: PrismaClient,
  model: any,
  id: string
): Promise<T> {
  return prisma[model].update({
    data: {
      baseState: BaseState.DELETED
    },
    where: { id }
  });
}

export function safeWhere(where: any): any {
  return {
    ...where,
    baseState: BaseState.ACTIVE
  };
}
