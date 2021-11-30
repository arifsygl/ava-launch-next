import { window } from 'vscode'

export function getTerminal() {
	const { terminals } = window
	const terminalName = 'avaLaunch'

	const terminal = terminals.find(x => x.name === terminalName)

	if (!terminal) {
		return window.createTerminal(terminalName)
	}
		
	return terminal
}
