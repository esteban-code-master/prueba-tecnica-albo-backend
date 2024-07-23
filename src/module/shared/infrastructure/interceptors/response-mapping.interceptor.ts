import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseApi<T> {
	response: T;
}

@Injectable()
export class ResponseMappingInterceptor<T>
	implements NestInterceptor<T, ResponseApi<T>>
{
	constructor(private readonly reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<ResponseApi<T>> {
		const target = context.getHandler();
		const message = this.reflector.get('message', target);
		const status = context.switchToHttp().getResponse<Response>().statusCode;
		const path = context.switchToHttp().getRequest<Request>().url;

		return next.handle().pipe(
			map((data) => ({
				headers: {
					message: message,
					status: status
				},
				response: data,
				timestamp: new Date().toISOString(),
				path: path
			}))
		);
	}
}
