import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { prismaServiceProvider } from '../common/prisma/prisma.service';

@Module({
  imports: [],
  providers: [ItemResolver, ItemService, prismaServiceProvider]
})
export class ItemModule {}
