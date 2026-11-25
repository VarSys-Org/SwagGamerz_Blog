import { describe, expect, it } from 'vitest';
import { sortChecksBySeverity } from './check-order';

describe('SEO check ordering', () => {
	it('sorts checks by severity without mutating the source list', () => {
		const checks = [{ level: 'good' as const }, { level: 'bad' as const }, { level: 'warn' as const }];

		expect(sortChecksBySeverity(checks)).toEqual([{ level: 'bad' }, { level: 'warn' }, { level: 'good' }]);
		expect(checks).toEqual([{ level: 'good' }, { level: 'bad' }, { level: 'warn' }]);
	});
});
