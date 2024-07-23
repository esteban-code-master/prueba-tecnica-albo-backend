import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable()
export class GetTaskUseCase {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string): Promise<Task | null> {
		return this.taskRepository.findById(id);
	}

	async executeAll(): Promise<Task[]> {
		return this.taskRepository.findAll();
	}
}
