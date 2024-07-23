import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaborateModule } from './module/collaborate/collaborate.module';
import { EnvironmentModule } from './module/config/environment/environment-config.module';
import { EnvironmentService } from './module/config/environment/environment-config.service';
import { TaskModule } from './module/task/task.module';

@Module({
	imports: [
		EnvironmentModule,
		MongooseModule.forRootAsync({
			useFactory: async (environment: EnvironmentService) => ({
				uri: environment.getDatabaseUri()
			}),
			inject: [EnvironmentService]
		}),
		TaskModule,
		CollaborateModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
