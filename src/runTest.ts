import { window, workspace } from 'vscode'
import { getScriptName } from './utils/getScriptName'
import { getTerminal } from './utils/getTerminal'
import { currentFilePath } from './utils/currentFilePath'

export function runTest(test: string) {
	try {
		const filePath = currentFilePath()
		const projectDir = workspace.workspaceFolders?.map(folder => folder.uri.path)
		const terminal = getTerminal()

		const scriptName = getScriptName(filePath)

		terminal.show()
		terminal.sendText(
			`cd ${projectDir} && npm run ${scriptName} -- ${filePath} -m="${test}"`
		)
	} catch (e: any) {
		window.showErrorMessage(e.message)
	}
}
