import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserDoesNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma = new PrismaClient()) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        [validationArguments.property]: value
      } as any
    });
    return user === null;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already taken`;
  }
}

export function UserDoesNotExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserDoesNotExistConstraint
    });
  };
}
