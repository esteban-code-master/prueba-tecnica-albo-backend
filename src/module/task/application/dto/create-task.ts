import { ApiProperty } from '@nestjs/swagger';
import {
	ArrayNotEmpty,
	IsArray,
	IsISO8601,
	IsNotEmpty,
	IsString
} from 'class-validator';

export class CreateTaskDto {
	@ApiProperty({
		description: 'The title of the task',
		example: 'Task Title'
	})
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@ApiProperty({
		description: 'A description of the task',
		example: 'This task involves...'
	})
	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@ApiProperty({
		description: 'The start date of the task in ISO 8601 format',
		example: '2024-07-01T00:00:00Z'
	})
	@IsISO8601()
	@IsNotEmpty()
	readonly dateStart: string;

	@ApiProperty({
		description: 'The end date of the task in ISO 8601 format',
		example: '2024-07-31T23:59:59Z'
	})
	@IsISO8601()
	@IsNotEmpty()
	readonly dateEnd: string;

	@ApiProperty({
		description: 'List of collaborators involved in the task',
		type: [String],
		example: ['user1', 'user2']
	})
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	readonly collaborate: string[];
}
