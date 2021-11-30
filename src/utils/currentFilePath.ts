import { window } from 'vscode'

export function currentFilePath(): string {
	const editor = window.activeTextEditor

	if (!editor) {
		throw new Error('ava-launcher runTest() called with no active editor')
	}

	return editor.document.uri.path
}
