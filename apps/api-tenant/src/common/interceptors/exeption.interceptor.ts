import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import { BadUserInputError } from '../exception/bad_user_input.error';
import { PAGINATION_ERRORS } from '../constants/error.constants';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): any {
    return handler.handle().pipe(
      catchError((error) =>
        throwError(() => {
          if (PAGINATION_ERRORS.includes(error.message)) {
            return new BadUserInputError(error.message);
          } else if (error.extensions?.code || error.response?.statusCode) {
            return error;
          } else {
            return new Error(error);
          }
        })
      )
    );
  }
}
