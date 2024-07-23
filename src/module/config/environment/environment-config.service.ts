import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './environment-config.entity';

@Injectable()
export class EnvironmentService implements DatabaseConfig {
	constructor(private configService: ConfigService) {}

	getDatabaseUri(): string {
		return this.configService.get<string>('APP_DATABASE_URI');
	}
}
