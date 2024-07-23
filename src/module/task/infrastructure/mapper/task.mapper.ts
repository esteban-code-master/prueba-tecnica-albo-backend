import { Task } from '../../domain/entities/task';
import { Task as TaskModel } from '../schemas/task';

export class TaskMapper {
	static toDomain(taskDoc: TaskModel): Task {
		return new Task(
			taskDoc._id.toString(),
			taskDoc.title,
			taskDoc.description,
			taskDoc.dateStart,
			taskDoc.dateEnd,
			taskDoc.collaborate,
			taskDoc.status
		);
	}

	static toPersistence(task: Task): any {
		return {
			title: task.title,
			description: task.description,
			dateStart: task.dateStart,
			dateEnd: task.dateEnd,
			collaborate: task.collaborate,
			status: task.status
		};
	}
}
