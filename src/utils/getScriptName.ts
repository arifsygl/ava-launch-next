import { workspace } from 'vscode'

const CONFIGURATION = 'ava-launch'
const DEFAULT_SCRIPT = 'test'

export function getScriptName(filePath: string): string {	

	// get temp and int config values
	const launchConfiguration = workspace.getConfiguration(CONFIGURATION)
	const tempExtension: string | undefined = launchConfiguration.get('tempTestFileExtension')
	const intExtension: string | undefined = launchConfiguration.get('integrationTestFileExtension')
	const tempScript: string | undefined = launchConfiguration.get('tempTestFileScript')
	const intScript: string | undefined = launchConfiguration.get('integrationTestFileScript')

	// return proper script name
	if (tempExtension && tempScript && filePath.endsWith('.' + tempExtension)) {
		return tempScript
	}

	if (intExtension && intScript && filePath.endsWith('.' + intExtension)) {
		return intScript
	}

	return DEFAULT_SCRIPT
}
