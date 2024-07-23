import { Controller, Get } from '@nestjs/common';

@Controller('task')
export class TaskController {
	@Get()
	public async get() {
		return 'init';
	}
}
