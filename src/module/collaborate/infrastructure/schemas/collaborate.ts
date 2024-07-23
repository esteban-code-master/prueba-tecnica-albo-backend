import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Collaborate {
	@Prop({ type: 'ObjectId', auto: true })
	_id: string;

	@Prop()
	name: string;

	@Prop({ unique: true })
	email: number;

	@Prop()
	password: string;
}

export const CollaborateSchema = SchemaFactory.createForClass(Collaborate);
