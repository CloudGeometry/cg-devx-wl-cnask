import { GraphQLError } from 'graphql/error';
import { ERROR_CODES } from '../constants/error.constants';
import { CustomValidationError } from '../utils/custom_validation_pipe';

const BAD_USER_INPUT = ERROR_CODES.BAD_USER_INPUT;

export class BadUserInputError extends GraphQLError {
  constructor(message: string, argumentName?: string, options?: any) {
    super(message, options);
    this.extensions['code'] = BAD_USER_INPUT;
    const error = {} as CustomValidationError;
    error.message = message;
    if (argumentName) {
      error.argumentName = argumentName;
    }
    this.extensions['errors'] = [error];
  }
}
