import { NestInterceptor, UseInterceptors, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from "src/dtos/user.dto";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new (...args: any[]): {};
}



export function Serialize(dto: ClassConstructor) {
   return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        //before the request is handled by the request handler
        // console.log("Before...", context);

        return handler.handle().pipe(
            map((data: any) => {
                // before the response is sent out
                // console.log("After...", data);
                return plainToClass(this.dto, data, {excludeExtraneousValues: true});
            })
        );


}}
