# Browser Tab Reloader VSCode Extension

This extension helps to automatically reload browser tabs when files in your workspace change.

## Features

This extension provides the following features:

- **Automatic Browser Tab Reloading:** Automatically reloads browser tabs when files in your workspace change.
- **Customizable Settings:** Configure which files and browsers to monitor and reload.

![Automatic Browser Tab Reloading](images/image.jpeg)

## Requirements

To use this extension, ensure you have the following installed:

- **Node.js:** Required to run the extension's server.
- **VS Code:** Ensure you have the latest version installed.
- **Supported Browsers:** Chrome, Firefox, or any other browser that supports remote debugging.

### Installation of Node.js

Download and install Node.js from [Node.js official website](https://nodejs.org/).

## Extension Settings

This extension contributes the following settings:

- `browserTabReloader.fileExtensions`: Comma-separated list of file extensions to watch.
- `browserTabReloader.reloadDelay`: Delay in milliseconds before reloading after a file change.

Example settings in your `settings.json`:

```json
{
    "browserTabReloader.fileExtensions": "html, css, js",
    "browserTabReloader.reloadDelay": 50,
    "browserTabReloader.port": 54999,
}
```

<!-- ## Known Issues

- Currently, only supports Chrome and Firefox browsers.
- Some file changes might not be detected due to VS Code's internal caching mechanism. -->

## Release Notes

### 1.0.0

- Initial release of browser-tab-reloader-vscode-extension.
- Features automatic reloading of browser tabs on file changes.
