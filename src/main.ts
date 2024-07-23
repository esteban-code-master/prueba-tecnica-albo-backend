import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './module/shared/infrastructure/filter/http-exception.filter';
import { ResponseMappingInterceptor } from './module/shared/infrastructure/interceptors/response-mapping.interceptor';
import { setupSwagger } from './swagger';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	});

	const configService = app.get<ConfigService>(ConfigService);
	const globalPrefix = configService.get('APP_GLOBAL_PREFIX');
	const port = configService.get('APP_PORT');

	console.log('hola');

	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()));
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	setupSwagger(app);
	await app.listen(port);
}

bootstrap();
