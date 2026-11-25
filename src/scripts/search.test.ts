import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSearchDebouncer, createSearchIndexLoader, isSearchQueryCurrent, type SearchRow } from './search';

const searchRows: SearchRow[] = [{ u: '/post/', t: 'Post', d: 'Description', c: 'Category', k: 'keyword', p: '2026-01-01' }];

describe('search helpers', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('shares an in-flight index request between searches', async () => {
		let resolveRows!: (rows: SearchRow[]) => void;
		const fetchRows = vi.fn(() => new Promise<SearchRow[]>((resolve) => { resolveRows = resolve; }));
		const loadRows = createSearchIndexLoader(fetchRows);

		const firstRequest = loadRows();
		const secondRequest = loadRows();

		expect(firstRequest).toBe(secondRequest);
		expect(fetchRows).toHaveBeenCalledTimes(1);
		resolveRows(searchRows);
		await expect(firstRequest).resolves.toEqual(searchRows);
	});

	it('allows results only for the current trimmed input', () => {
		expect(isSearchQueryCurrent(' current ', 'current')).toBe(true);
		expect(isSearchQueryCurrent('newer', 'older')).toBe(false);
	});

	it('cancels the pending debounce when Enter submits', () => {
		vi.useFakeTimers();
		const search = vi.fn();
		const debouncer = createSearchDebouncer(search);

		debouncer.schedule('current');
		debouncer.submit('current');
		vi.advanceTimersByTime(300);

		expect(search).toHaveBeenCalledTimes(1);
		expect(search).toHaveBeenCalledWith('current');
	});
});
