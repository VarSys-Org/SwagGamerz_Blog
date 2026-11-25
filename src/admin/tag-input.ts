export function shouldCommitTagInput(key: string, isComposing: boolean, keyCode: number): boolean {
	if (isComposing || keyCode === 229) return false;
	return key === 'Enter' || key === ',';
}
