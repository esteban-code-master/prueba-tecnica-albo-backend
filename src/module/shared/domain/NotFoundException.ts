import { DomainError } from '@shared/domain/DomainError';

export abstract class NotFoundException extends DomainError {
	protected constructor(message: string) {
		super(message);
	}
}
