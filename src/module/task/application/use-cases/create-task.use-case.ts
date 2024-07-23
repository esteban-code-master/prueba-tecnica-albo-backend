import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '@task/application/dto/create-task';
import { Task } from '@task/domain/entities/task';
import { TaskRepository } from '@task/domain/repositories/task.repository';

@Injectable()
export class CreateTaskUseCase {
	constructor(
		@Inject(TaskRepository) private readonly taskRepository: TaskRepository
	) {}

	async execute(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description, dateStart, dateEnd, collaborate } = createTaskDto;

		const task = new Task(
			undefined,
			title,
			description,
			dateStart,
			dateEnd,
			collaborate,
			undefined
		);

		return await this.taskRepository.save(task);
	}
}
