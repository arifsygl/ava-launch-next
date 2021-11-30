import * as vscode from 'vscode'
import { debugTest } from './debugTest'
import { runTest } from './runTest'
import { CodelensProvider } from './utils/CodelensProvider'


export function activate(context: vscode.ExtensionContext) {

	const runTestCommand = vscode.commands.registerCommand(
		'ava-launch.runTest',
		async (test) => {
			runTest(test)
		}
	)

	context.subscriptions.push(runTestCommand)

	const debugTestCommand = vscode.commands.registerCommand(
		'ava-launch.debugTest',
		async (test) => {
			debugTest(test)
		}
	)
	context.subscriptions.push(debugTestCommand)

	vscode.languages.registerCodeLensProvider(
		[
			'typescript',
			'javascript',
		],
		new CodelensProvider()
	)
}

// this method is called when your extension is deactivated
export function deactivate() { }
