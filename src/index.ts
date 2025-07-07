export class AssertionError extends Error {}
export type GetMessageFunction = (value: unknown) => string;
type _ErrorConstructor = new (message?: string) => Error;

export function ok(
	value: unknown,
	message?: string | GetMessageFunction | Error,
	errorConstructor?: _ErrorConstructor
): asserts value {
	const _errorConstructor = errorConstructor ?? AssertionError;
	if (!value) {
		if (typeof message === 'string') {
			throw new _errorConstructor(message);
		} else if (message instanceof Error) {
			throw message;
		} else if (typeof message === 'function') {
			throw new _errorConstructor(message(value));
		}
		throw new _errorConstructor(`Assertion failed: ${value}`);
	}
}

// Define the type for the callable object
type AssertNamespace = {
	(
		value: unknown,
		message?: string | GetMessageFunction | Error,
		errorConstructor?: ErrorConstructor
	): asserts value;
	assert: typeof ok;
	ok: typeof ok;
};

// Create the function
const assert: AssertNamespace = ok as AssertNamespace;

// Attach properties
assert.assert = ok;
assert.ok = ok;

export default assert;
