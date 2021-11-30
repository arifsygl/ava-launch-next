# ava-multi-config-runner

Debug and run single AVA (<https://github.com/avajs/ava>) tests easily using multiple npm scripts. Supports both unit and integration tests.

![in action](images/ava-launch-debug.gif)

## Why

The combination of a test runner and a debugger is phenomenal for rapid code development.  But with TS in particular it can be hard to get the VS Code debugger and AVA to cooperate.  I wanted a zero learning curve--just click to launch from within your own code!

## Getting Started

### Launching Vanilla Tests

You should be able to debug or run normal test files immediately. Remember that you should specify your AVA specs in your project.  One simple way is within your `project.json`:

```json
  "ava": {
    "files": [
      "test/**/*.test.ts"
    ],
    "extensions": [
      "ts"
    ],
    "require": [
      "ts-node/register"
    ]
  }
```

### Integration or "Temp" Tests

To set up integration tests, follow these steps:

1. Create an npm script. You will probably need to have it call a designated config file, e.g.

    ```json
        "int-test": "ava --config int-tests.config.cjs",
    ```

2. Add the config file to your project root directory.  For instance, `int-tests.config.cjs` could look like this:

    ```cjs
    module.exports = {
    files: ['test/int/**/*.int.ts'],
    "extensions": [
        "ts"
    ],
    "require": [
        "ts-node/register"
    ],
    "timeout": "20m"
    };
    ```

3. designate in the [Extension Settings](#extension-settings) a unique file extension for integration tests and the name of the npm script:

    ![ava-launch settings](images/ava-launch-int-test-settings.png)

After that, any time you click on `DebugTest`, `ava-launch` will run the correct script.  No need for setting up a launch configuration!

The same can be done for `temp` tests.

## Features

* CodeLens for `DebugTest` and `RunTest`.
* No learning curve.  No need to create a launch configuration.
* Adds any `.env` file variables to a launch.  That's important if you are using something like NPM_TOKEN to download a private file.
* Currently supports three types of tests: 
  * unit (uses the npm `test` script)
  * integration
  * temp.

  A temp test is useful just for a quick check on a portion of your code. [Note: the terms "integration" and "temp" do not inherently mean anything to `ava-launch`.  You can use them for any type of test that you require.]
* For the `integration` and `temp` types, you can specify in the `ava-launch` configuration an npm script and a file extension.  For instance, for integration tests you can specify `int-test` as an npm script and `int.ts` as a file extension. You can then run whatever you'd like there.
* Click on Codelenses `DebugTest` to launch a debugger, and `RunTest` to run it.  The script to execute is determined from the extension of the active file.  If the active file extension is neither the one for `integration` nor `temp`, then the `test` script gets executed.

## Credit

This is based on the VSC extension [ava-test-runner](https://github.com/jacekczapiewski/vscode-ava-test-runner) created by jacekczapiewski.  I fell in love with that extension, became it's first reviewer with 5 stars, and in fact promoted it in two webinars on unit testing.  I still recommend it if you want a simple way to run tests.

But I needed to run multiple types of tests, with a designated npm test for each type. That's useful if you use AVA for both unit and integration tests, because you probably want to be able to handle both.

## Extension Settings

### Integration Tests

* `ava-launch.integrationTestFileExtension`: extension for integration test files.
* `ava-launch.integrationTestFileScript`: npm script to run for integration tests. You can specify one that runs with a long timeout, and that only looks in certain paths.

### Temp Tests

* `ava-launch.tempTestFileExtension`:  extension for a temp test file.
* `ava-launch.tempTestFileScript`:  npm script to run for temp tests.  Works the same way as with the integration tests.

## Known Issues

None so far, but the extension is new.

## Release Notes

### 1.0.0

Initial release.
