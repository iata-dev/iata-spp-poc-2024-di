import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseTimeInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];
    return next.handle().pipe(
      tap(() => {
        this.logger.debug(
          `Request to ${request.url} took ${Date.now() - now}ms called from ${userAgent} with ${ip}`,
        );
      }),
    );
  }
}
