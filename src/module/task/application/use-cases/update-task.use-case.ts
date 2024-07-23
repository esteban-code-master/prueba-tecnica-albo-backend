import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { UpdateTaskDto } from '../dto/update-task';

@Injectable()
export class UpdateTaskUseCase {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
		const task = await this.taskRepository.findById(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		const updatedTask = task.update(updateTaskDto);

		return await this.taskRepository.update(updatedTask);
	}
}
