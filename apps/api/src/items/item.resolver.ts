import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Item, PaginatedItems } from './models/item.model';
import { User } from '../user/models/user.model';
import { UserEntity } from '../common/decorators/user.decorator';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemService } from './item.service';
import { ItemFilterInput, ItemOrderByInput } from './dto/filter-item.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { Permissions } from '../common/decorators/permission.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import {
  PermissionAction,
  PermissionObjectType
} from '../role/models/role.model';
import { Conditions } from '../common/decorators/conditions.decorator';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.ITEM])
  @Query(() => PaginatedItems, {
    description: 'Get all items uses a pagination'
  })
  async items(
    @Conditions() conditions: object,
    @Args() paginateOptions?: PaginationArgs,
    @Args('filter', { nullable: true }) where?: ItemFilterInput,
    @Args('orderBy', { nullable: true }) orderBy?: ItemOrderByInput
  ): Promise<PaginatedItems> {
    return this.itemService.getItemsWithFilterAndPagination({
      where,
      orderBy,
      paginateOptions,
      conditions
    });
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.READ, PermissionObjectType.ITEM])
  @Query(() => Item, { description: 'Get item by id' })
  async item(
    @Conditions() conditions: object,
    @Args('id', {
      type: () => String
    })
    id: string
  ) {
    return this.itemService.item(id, conditions);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.CREATE, PermissionObjectType.ITEM])
  @Mutation(() => Item, { description: 'Create item' })
  async createItem(
    @UserEntity() user: User,
    @Args('data') data: CreateItemInput
  ) {
    return this.itemService.createItem(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.UPDATE, PermissionObjectType.ITEM])
  @Mutation(() => Item, { description: 'Update item' })
  async updateItem(
    @UserEntity() user: User,
    @Conditions() conditions: object,
    @Args('id', { type: () => String })
    id: string,
    @Args('data', { type: () => UpdateItemInput })
    data: UpdateItemInput
  ): Promise<Item> {
    return this.itemService.updateItem(user.id, id, data, conditions);
  }

  @UseGuards(GqlAuthGuard)
  @Permissions([PermissionAction.DELETE, PermissionObjectType.ITEM])
  @Mutation(() => Item, { description: 'Delete item' })
  async deleteItem(
    @Conditions() conditions: object,
    @Args('id', { type: () => String })
    id: string
  ): Promise<Item> {
    return this.itemService.deleteItem(id, conditions);
  }

  @ResolveField('assignee', () => User)
  assignee(@Parent() item: Item) {
    return this.itemService.assignee(item.id);
  }

  @ResolveField('createdBy', () => User)
  createdBy(@Parent() item: Item) {
    return this.itemService.createdBy(item.id);
  }

  @ResolveField('updatedBy', () => User)
  updatedBy(@Parent() item: Item) {
    return this.itemService.updatedBy(item.id);
  }
}
