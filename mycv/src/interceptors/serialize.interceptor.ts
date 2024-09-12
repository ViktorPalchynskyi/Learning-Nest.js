import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run someting before a request is handled
        // by the request handler
        console.log('Before the handler', context);

        return next.handle().pipe(
            map((data: any) => {
                // Run somthing before the response is sent out
                console.log('Before response is sent out', data);
            })
        );
    }
}
