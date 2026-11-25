export type CheckLevel = 'bad' | 'warn' | 'good';

const checkLevelOrder: CheckLevel[] = ['bad', 'warn', 'good'];

export function sortChecksBySeverity<T extends { level: CheckLevel }>(checks: T[]): T[] {
	return checks.toSorted((first, second) => checkLevelOrder.indexOf(first.level) - checkLevelOrder.indexOf(second.level));
}
