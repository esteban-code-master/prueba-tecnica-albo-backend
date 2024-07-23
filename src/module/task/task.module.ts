import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from '@task/application/services/task.service';
import { CreateTaskUseCase } from '@task/application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '@task/application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '@task/application/use-cases/get-task.use-case';
import { UpdateTaskUseCase } from '@task/application/use-cases/update-task.use-case';
import { TaskController } from '@task/infrastructure/controllers/task.controller';
import { TaskRepositoryImpl } from '@task/infrastructure/repositories/task.repository.impl';
import { Task, TaskSchema } from '@task/infrastructure/schemas/task';
import { TaskRepository } from './domain/repositories/task.repository';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])
	],
	controllers: [TaskController],
	providers: [
		TaskService,
		CreateTaskUseCase,
		UpdateTaskUseCase,
		GetTaskUseCase,
		DeleteTaskUseCase,
		{
			provide: TaskRepository,
			useClass: TaskRepositoryImpl
		}
	]
})
export class TaskModule {}
