// essentially lifted from: https://github.com/microsoft/vscode-extension-samples/tree/main/codelens-sample

import {
    CancellationToken,
    CodeLens,
    CodeLensProvider,
    Event,
    EventEmitter,
    Position,
    TextDocument,
    window,
    workspace
} from 'vscode'

const testMatchingRegEx = /test(\.(serial|skip|only|failing))?\(\s*'(.+)'/g

/*
 * CodelensProvider
 */
export class CodelensProvider implements CodeLensProvider {
    private codeLenses: CodeLens[] = []
    private regex: RegExp
    private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>()
    public readonly onDidChangeCodeLenses: Event<void> = this._onDidChangeCodeLenses.event

    constructor() {
        this.regex = testMatchingRegEx

        workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire()
        })
    }

    public provideCodeLenses(document: TextDocument, token: CancellationToken): CodeLens[] | Thenable<CodeLens[]> {
        try {

            this.codeLenses = []
            const regex = new RegExp(this.regex)
            const text = document.getText()
            let matches
            while ((matches = regex.exec(text)) !== null) {
                const line = document.lineAt(document.positionAt(matches.index).line)
                const indexOf = line.text.indexOf(matches[0])
                const position = new Position(line.lineNumber, indexOf)
                const range = document.getWordRangeAtPosition(position, new RegExp(this.regex))
                if (range) {

                    const testString = matches[3]

                    this.codeLenses.push(new CodeLens(
                        range,
                        {
                            title: 'DebugTest',
                            command: 'ava-launch.debugTest',
                            arguments: [testString]
                        }
                    ))
                    this.codeLenses.push(new CodeLens(
                        range,
                        {
                            title: 'RunTest',
                            command: 'ava-launch.runTest',
                            arguments: [testString]
                        }
                    ))
                }
                return this.codeLenses
            }

        } catch (e: any) {
            window.showErrorMessage(e.message)
        }
        return []
    }

}