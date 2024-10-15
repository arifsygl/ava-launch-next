import { window, workspace } from "vscode";
import { getScriptName } from "./utils/getScriptName";
import { getTerminal } from "./utils/getTerminal";
import { currentFilePath } from "./utils/currentFilePath";
import { platform } from "os";

export function runTest(test: string) {
  try {
    let filePath = currentFilePath();
    let projectDir = workspace.workspaceFolders?.map(
      (folder) => folder.uri.path
    );

    if (platform() === "win32") {
      filePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
      projectDir = projectDir?.map((dir) =>
        dir.startsWith("/") ? dir.slice(1) : dir
      );
    }

    const terminal = getTerminal();
    const scriptName = getScriptName(filePath);

    terminal.show();
    terminal.sendText(
      `cd ${projectDir} && npm run ${scriptName} -- ${filePath} -m="${test}"`
    );
  } catch (e: any) {
    window.showErrorMessage(e.message);
  }
}
