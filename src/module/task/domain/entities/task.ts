import { TaskStatus } from '../enum/task.status';
import { TaskParams } from '../interface/task-params';

export class Task {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public dateStart: string,
		public dateEnd: string,
		public collaborate: string[],
		public status: TaskStatus
	) {}

	public update(params: Partial<TaskParams>) {
		return new Task(
			this.id,
			params.title,
			params.description,
			params.dateStart,
			params.dateEnd,
			params.collaborate,
			params.status
		);
	}
}
