import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '@task/domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository
	) {}

	async execute(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
