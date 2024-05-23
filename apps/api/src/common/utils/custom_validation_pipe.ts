import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql/error';
import { ERROR_CODES } from '../constants/error.constants';

const BAD_USER_INPUT = ERROR_CODES.BAD_USER_INPUT;

export type CustomValidationError = {
  message: string;
  argumentName?: string;
};

export const custom_validation_pipe = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    const extensions = {
      code: BAD_USER_INPUT,
      errors: [] as CustomValidationError[]
    };
    errors.forEach((error) => {
      extensions.errors.push({
        message: Object.values(error.constraints).join(),
        argumentName: error.property
      });
    });
    return new GraphQLError('Validation error', { extensions });
  }
});
