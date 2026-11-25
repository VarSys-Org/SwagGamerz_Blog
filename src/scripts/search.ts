export type SearchRow = { u: string; t: string; d: string; c: string; k: string; p: string };

export function createSearchIndexLoader(fetchRows: () => Promise<SearchRow[]>) {
	let rowsPromise: Promise<SearchRow[]> | null = null;

	return () => {
		if (!rowsPromise) {
			rowsPromise = fetchRows().catch((error: unknown) => {
				rowsPromise = null;
				throw error;
			});
		}
		return rowsPromise;
	};
}

export function isSearchQueryCurrent(inputValue: string, query: string) {
	return inputValue.trim() === query;
}

export function createSearchDebouncer(search: (query: string) => void, delay = 300) {
	let timer: ReturnType<typeof setTimeout> | undefined;

	function cancel() {
		clearTimeout(timer);
		timer = undefined;
	}

	return {
		schedule(query: string) {
			cancel();
			timer = setTimeout(() => {
				timer = undefined;
				search(query);
			}, delay);
		},
		submit(query: string) {
			cancel();
			search(query);
		},
	};
}
