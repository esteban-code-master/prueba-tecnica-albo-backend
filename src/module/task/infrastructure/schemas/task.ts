import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '@task/domain/enum/task.status';

@Schema()
export class Task {
	@Prop({ type: 'ObjectId', auto: true })
	_id?: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	dateStart: string;

	@Prop({ required: true })
	dateEnd: string;

	@Prop({ type: [String], required: true })
	collaborate: string[];

	@Prop({ enum: TaskStatus, default: TaskStatus.pending })
	status: TaskStatus;

	@Prop({ required: true })
	order: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
