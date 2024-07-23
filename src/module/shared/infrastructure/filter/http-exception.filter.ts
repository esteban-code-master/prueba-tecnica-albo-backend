import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Logger
} from '@nestjs/common';
import { DomainError } from '@shared/domain/DomainError';
import { InvalidArgumentException } from '@shared/domain/InvalidArgumentException';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: T, host: ArgumentsHost) {
		const response: Response = host.switchToHttp().getResponse<Response>();
		const request: Request = host.switchToHttp().getRequest<Request>();

		if (exception instanceof DomainError) {
			const status =
				exception instanceof InvalidArgumentException
					? HttpStatus.BAD_REQUEST
					: HttpStatus.NOT_FOUND;
			response.status(status).json({
				headers: {
					error: {
						code: exception.message ?? exception.name
					},
					message: exception.message,
					success: false,
					status
				},
				timestamp: new Date().toISOString(),
				path: request.url
			});

			this.logger.error(
				`Domain Error ${exception.name} Error: ${exception.message}`
			);
			return;
		}

		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).json({
				headers: {
					error: {
						code: exception.cause?.message ? exception.cause.message : exception.name
					},
					message: exception.getResponse(),
					success: false,
					status: exception.getStatus()
				},
				timestamp: new Date().toISOString(),
				path: request.url
			});

			this.logger.error(
				`Status ${exception.getStatus()} Error: ${JSON.stringify(
					exception.getResponse()
				)}`
			);
			return;
		}

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			headers: {
				error: {
					code: 'ERROR_INTERVAL_SERVER'
				},
				message: new InternalServerErrorException().message,
				success: false,
				status: HttpStatus.INTERNAL_SERVER_ERROR
			},
			timestamp: new Date().toISOString(),
			path: request.url
		});

		this.logger.error(exception);
		this.logger.error(
			`Status ${HttpStatus.INTERNAL_SERVER_ERROR} Error: ${JSON.stringify(
				new InternalServerErrorException().message
			)}`
		);
	}
}
