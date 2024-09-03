# Browser Tab Reloader VSCode Extension

This extension helps to automatically reload browser tabs when files in your workspace change.

<p align="center">
  <img src="https://github.com/stefanFortza/Browser-Tab-Reloader-Extension/blob/main/browser-tab-reloader-vscode-extension/images/image.jpeg?raw=true" alt="Automatic Browser Tab Reloading">
</p>

## ⚠️ Important Configuration Warning

If you are using a backend server (e.g., Django) that takes time to reload after file changes, it is crucial to adjust the `reloadDelay` setting. This delay ensures that the browser does not refresh before the server is ready, preventing potential issues with incomplete reloads.

**Example:**

```json
{
    "browserTabReloader.reloadDelay": 1500  // Increase the delay (in milliseconds) if your server is slow to reload
}
```

## Features

This extension provides the following features:

- **Automatic Browser Tab Reloading:** Automatically reloads browser tabs when files in your workspace change.
- **Customizable Settings:** Configure which files and browsers to monitor and reload.
- **Configurable Reload Delay:** Adjust the delay before reloading to ensure your backend server (e.g. Django, Express) has time to compile changes.




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
    "browserTabReloader.reloadDelay": 500,
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
