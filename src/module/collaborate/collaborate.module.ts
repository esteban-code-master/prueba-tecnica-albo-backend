import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Collaborate,
	CollaborateSchema
} from './infrastructure/schemas/collaborate';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Collaborate.name, schema: CollaborateSchema }
		])
	],
	controllers: [],
	providers: []
})
export class CollaborateModule {}
