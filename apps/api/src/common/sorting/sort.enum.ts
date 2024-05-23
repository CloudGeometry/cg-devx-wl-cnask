import { registerEnumType } from '@nestjs/graphql';

export enum Sort {
  ASC = 'asc',
  DESC = 'desc'
}

registerEnumType(Sort, {
  name: 'Sort'
});
