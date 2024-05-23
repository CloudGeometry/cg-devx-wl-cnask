import { Injectable } from '@nestjs/common';
import { Item, PaginatedItems } from './models/item.model';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemFilterInput, ItemOrderByInput } from './dto/filter-item.input';
import { paginate, PaginateOptions } from '../common/pagination/paginator';
import { orderArray } from '../common/sorting/utils';
import { BadUserInputError } from '../common/exception/bad_user_input.error';
import { safeDelete, safeWhere } from '../common/utils/safe.filter';
import { PrismaService } from 'common/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getItemsWithFilterAndPagination({
    where,
    orderBy,
    paginateOptions,
    conditions
  }: {
    where?: ItemFilterInput;
    orderBy?: ItemOrderByInput;
    paginateOptions?: PaginateOptions;
    conditions?: object;
  }): Promise<PaginatedItems> {
    return paginate(
      this.prisma.item,
      {
        where: safeWhere({
          ...where,
          ...conditions
        }),
        orderBy: orderArray(orderBy)
      },
      paginateOptions
    );
  }

  async item(id: string, conditions?: object): Promise<Item> {
    return await this.prisma.item.findFirst({
      where: {
        id,
        ...(conditions || {})
      }
    });
  }

  async createItem(userId: string, data: CreateItemInput): Promise<Item> {
    return await this.prisma.item.create({
      data: {
        ...data,
        createdById: userId
      }
    });
  }

  async updateItem(
    userId: string,
    id: string,
    data: UpdateItemInput,
    conditions?: object
  ): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: { id, ...(conditions || {}) }
    });

    if (!item) {
      throw new BadUserInputError(`No item found for id: ${id}`, 'id');
    }

    return await this.prisma.item.update({
      data: {
        ...data,
        updatedById: userId,
        updatedAt: new Date()
      },
      where: { id }
    });
  }

  async deleteItem(id: string, conditions?: object): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: { id, ...(conditions || {}) }
    });

    if (!item) {
      throw new BadUserInputError(`No item found for id: ${id}`, 'id');
    }
    return await safeDelete<Item>(this.prisma, 'item', id);
  }

  async assignee(id: string) {
    return await this.prisma.item.findUnique({ where: { id } }).assignee();
  }

  async createdBy(id: string) {
    return await this.prisma.item.findUnique({ where: { id } }).createdBy();
  }

  async updatedBy(id: string) {
    return await this.prisma.item.findUnique({ where: { id } }).updatedBy();
  }
}
