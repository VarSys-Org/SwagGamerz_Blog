import { describe, expect, it } from 'vitest';
import { shouldCommitTagInput } from './tag-input';

describe('tag input key handling', () => {
	it('commits Enter and comma outside IME composition', () => {
		expect(shouldCommitTagInput('Enter', false, 13)).toBe(true);
		expect(shouldCommitTagInput(',', false, 188)).toBe(true);
	});

	it('leaves composition keystrokes for the input method editor', () => {
		expect(shouldCommitTagInput('Enter', true, 13)).toBe(false);
		expect(shouldCommitTagInput(',', false, 229)).toBe(false);
	});
});
