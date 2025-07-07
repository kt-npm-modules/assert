import { describe, expect, it } from 'vitest';
import assert, { AssertionError } from '../src';

describe('assert.ok', () => {
	it('should not fail', () => {
		expect(() => {
			assert.ok(true);
		}).not.toThrow();
		expect(() => {
			assert(true, 'This should not throw');
		}).not.toThrow();
	});
	it('should fail with a default message', () => {
		expect(() => {
			assert.ok(false);
		}).toThrowError(AssertionError);
		expect(() => {
			assert.ok(false);
		}).toThrow('Assertion failed: false');
	});
	it('should fail with a message', () => {
		expect(() => {
			assert.ok(false, 'This should throw');
		}).toThrowError(AssertionError);
		expect(() => {
			assert.ok(false, 'This should throw');
		}).toThrow('This should throw');
	});
	it('should fail with a function message', () => {
		expect(() => {
			assert.ok(false, (value) => `This should throw for value: ${value}`);
		}).toThrowError(AssertionError);
		expect(() => {
			assert.ok(false, (value) => `This should throw for value: ${value}`);
		}).toThrow('This should throw for value: false');
	});
	it('should fail with an Error', () => {
		expect(() => {
			assert.ok(false, new Error('This should throw'));
		}).toThrowError(Error);
		expect(() => {
			assert.ok(false, new Error('This should throw'));
		}).toThrow('This should throw');
	});
	it('should fail with a custom error constructor', () => {
		class CustomError extends Error {
			constructor(message?: string) {
				super(message);
				this.name = 'CustomError';
			}
		}
		expect(() => {
			assert.ok(false, 'This should throw', CustomError);
		}).toThrowError(CustomError);
		expect(() => {
			assert.ok(false, 'This should throw', CustomError);
		}).toThrow('This should throw');
	});
});
