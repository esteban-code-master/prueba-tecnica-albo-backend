import { Task } from '../entities/task';

export interface TaskRepository {
	findById(id: string): Promise<Task | null>;
	findAll(): Promise<Task[]>;
	save(task: Task): Promise<Task>;
	update(task: Task): Promise<Task>;
	delete(id: string): Promise<void>;
}

export const TaskRepository = Symbol('TaskRepository');
