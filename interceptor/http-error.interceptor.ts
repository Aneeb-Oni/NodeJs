import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error.response) {
                    // The request was made, but the server responded with a status code outside the success range
                    return throwError(new BadGatewayException(error.response.data));
                } else if (error.request) {
                    // The request was made, but no response was received
                    return throwError(new BadGatewayException('No response received'));
                } else {
                    // Something happened in setting up the request that triggered an Error
                    return throwError(new BadGatewayException(error.message));
                }
            }),
        );
    }
}
