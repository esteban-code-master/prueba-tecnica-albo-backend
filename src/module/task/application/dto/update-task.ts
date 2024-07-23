import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '@task/domain/enum/task.status';
import {
	IsArray,
	IsEnum,
	IsISO8601,
	IsOptional,
	IsString
} from 'class-validator';

export class UpdateTaskDto {
	@ApiPropertyOptional({
		description: 'The title of the task',
		example: 'Updated Task Title'
	})
	@IsOptional()
	@IsString()
	readonly title?: string;

	@ApiPropertyOptional({
		description: 'A description of the task',
		example: 'This task has been updated to include new details.'
	})
	@IsOptional()
	@IsString()
	readonly description?: string;

	@ApiPropertyOptional({
		description: 'The start date of the task in ISO 8601 format',
		example: '2024-07-01T00:00:00Z'
	})
	@IsOptional()
	@IsISO8601()
	readonly dateStart?: string;

	@ApiPropertyOptional({
		description: 'The end date of the task in ISO 8601 format',
		example: '2024-07-31T23:59:59Z'
	})
	@IsOptional()
	@IsISO8601()
	readonly dateEnd?: string;

	@ApiPropertyOptional({
		description: 'List of collaborators involved in the task',
		type: [String],
		example: ['user3', 'user4']
	})
	@IsOptional()
	@IsArray()
	readonly collaborate?: string[];

	@ApiPropertyOptional({
		description: 'Status of task',
		example: ['complete', 'in-progress', 'pending']
	})
	@IsOptional()
	@IsEnum(TaskStatus)
	readonly status?: TaskStatus;
}
