import { Inject } from '@nestjs/common';
import { Task } from '../../domain/entities/task';
import { CreateTaskDto } from '../dto/create-task';
import { UpdateTaskDto } from '../dto/update-task';
import { CreateTaskUseCase } from '../use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../use-cases/delete-task.use-case';
import { GetTaskUseCase } from '../use-cases/get-task.use-case';
import { UpdateTaskUseCase } from '../use-cases/update-task.use-case';

export class TaskService {
	constructor(
		@Inject(CreateTaskUseCase)
		private readonly createTaskUseCase: CreateTaskUseCase,
		@Inject(UpdateTaskUseCase)
		private readonly updateTaskUseCase: UpdateTaskUseCase,
		@Inject(GetTaskUseCase)
		private readonly getTaskUseCase: GetTaskUseCase,
		@Inject(DeleteTaskUseCase)
		private readonly deleteTaskUseCase: DeleteTaskUseCase
	) {}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.createTaskUseCase.execute(createTaskDto);
	}

	async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
		return this.updateTaskUseCase.execute(id, updateTaskDto);
	}

	async getTaskById(id: string): Promise<Task | null> {
		return this.getTaskUseCase.execute(id);
	}

	async getAllTasks(): Promise<Task[]> {
		return this.getTaskUseCase.executeAll();
	}

	async deleteTask(id: string): Promise<void> {
		return this.deleteTaskUseCase.execute(id);
	}
}
