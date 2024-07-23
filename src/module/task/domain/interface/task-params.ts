import { TaskStatus } from '../enum/task.status';

export interface TaskParams {
	title: string;
	description: string;
	dateStart: string;
	dateEnd: string;
	collaborate: string[];
	order: number;
	status?: TaskStatus;
}
