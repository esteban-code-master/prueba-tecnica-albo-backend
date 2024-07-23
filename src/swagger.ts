import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: NestExpressApplication): void => {
	const configService = app.get<ConfigService>(ConfigService);
	const globalPrefix = configService.get('APP_GLOBAL_PREFIX');
	const appName = configService.get('APP_NAME');
	const appDescription = configService.get('APP_DESCRIPTION');
	const apiVersion = configService.get('APP_VERSION');
	const apiUrlDocs = configService.get('APP_API_DOCS');

	const config = new DocumentBuilder()
		.setTitle(appName)
		.setDescription(appDescription)
		.setVersion(apiVersion)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`/${apiUrlDocs}`, app, document, {
		explorer: true,
		swaggerOptions: {
			filter: true,
			showRequestDuration: true
		}
	});
};
