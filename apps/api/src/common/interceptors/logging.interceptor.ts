import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const user = gqlContext.getContext().req.user;
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const body = info.fieldNodes[0]?.loc?.source?.body;
      const message = `GraphQL:${parentType}:${fieldName}`;

      this.logger.log({
        context: message,
        userId: user ? user.id : null,
        username: user ? user.username : null,
        body: body
      });
    }
    return next.handle();
  }
}
