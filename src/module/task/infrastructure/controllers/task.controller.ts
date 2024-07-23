import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '@task/application/dto/create-task';
import { UpdateTaskDto } from '@task/application/dto/update-task';
import { TaskService } from '@task/application/services/task.service';
import { Task } from '@task/domain/entities/task';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new task' })
	@ApiResponse({
		status: 201,
		description: 'The task has been successfully created.',
		type: Task
	})
	@ApiResponse({ status: 400, description: 'Bad Request' })
	async createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
		return this.taskService.createTask(createTaskDto);
	}

	@Get(':id')
	async getTaskById(@Param('id') id: string): Promise<Task> {
		return this.taskService.getTaskById(id);
	}

	@Get()
	async getAllTasks(): Promise<Task[]> {
		return this.taskService.getAllTasks();
	}

	@Put(':id')
	async updateTask(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto
	): Promise<Task> {
		return this.taskService.updateTask(id, updateTaskDto);
	}

	@Delete(':id')
	async deleteTask(@Param('id') id: string): Promise<void> {
		return this.taskService.deleteTask(id);
	}
}
