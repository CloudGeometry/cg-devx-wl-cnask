import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info.model';
import { Connection, findManyCursorConnection } from './utils';

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
  @ObjectType(`${TItemClass.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => TItemClass)
    node: TItem;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: Array<EdgeType>;

    @Field(() => [TItemClass], { nullable: true })
    nodes: Array<TItem>;

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}

export type PaginateOptions = {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  offset?: number;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions
) => Promise<Connection<T>>;

export const paginator = (): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const { first, last, before, after, offset } = options || {};
    return await findManyCursorConnection(
      (args) => model.findMany({ ...args }),
      () => model.count({ where: args.where }),
      { first, last, before, after, offset },
      args
    );
  };
};

export const paginate: PaginateFunction = paginator();
