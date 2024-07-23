import { DomainError } from '@shared/domain/DomainError';

export abstract class InvalidArgumentException extends DomainError {
	protected constructor(message: string) {
		super(message);
	}
}
