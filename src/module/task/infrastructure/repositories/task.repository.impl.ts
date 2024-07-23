import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TaskMapper } from '../mapper/task.mapper';
import { Task as TaskModel } from '../schemas/task';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
	constructor(
		@InjectModel(TaskModel.name) private taskModel: Model<TaskModel>
	) {}

	async findById(id: string): Promise<Task | null> {
		const taskDoc = await this.taskModel.findById(id).exec();

		return taskDoc ? TaskMapper.toDomain(taskDoc) : null;
	}

	async findAll(): Promise<Task[]> {
		const taskDocs = await this.taskModel.find().exec();
		return taskDocs.map(TaskMapper.toDomain);
	}

	async save(task: Task): Promise<Task> {
		const newTask = new this.taskModel(TaskMapper.toPersistence(task));
		return TaskMapper.toDomain(await newTask.save());
	}

	async update(task: Task): Promise<Task> {
		const updatedTask = await this.taskModel
			.findByIdAndUpdate(task.id, TaskMapper.toPersistence(task), { new: true })
			.exec();

		return TaskMapper.toDomain(updatedTask);
	}

	async delete(id: string): Promise<void> {
		await this.taskModel.deleteOne({ _id: id }).exec();
	}
}
