import { platform } from "os";
import { debug, window, workspace } from "vscode";
import { currentFilePath } from "./utils/currentFilePath";

export function debugTest(test: string) {
  try {
    let filePath = currentFilePath();

    // if there's a multi-root workspace, we need to find the one with our file.
    const workspaceFolder = workspace.workspaceFolders?.filter((folder) =>
      filePath.includes(folder.uri.path)
    )[0];

    let projectDir = workspaceFolder?.uri.path;

    if (platform() === "win32") {
      filePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
      projectDir = projectDir?.startsWith("/")
        ? projectDir.slice(1)
        : projectDir;
    }

    const config = {
      type: "node",
      request: "launch",
      name: "ava-launch debug",
      envFile: `${workspace.rootPath}/.env`,
      cwd: projectDir,
      runtimeExecutable: "npx", // npx ile çalıştırmayı deneyin
      runtimeArgs: [
        "ava",
        "--inspect-brk",
        "-m", // veya --match
        test, // Burada doğrudan test ifadesini kullanın
        filePath,
      ],
      outputCapture: "std",
      skipFiles: ["<node_internals>/**/*.js"],
    };

    debug.startDebugging(workspaceFolder, config);
  } catch (e: any) {
    window.showErrorMessage(e.message);
  }
}
