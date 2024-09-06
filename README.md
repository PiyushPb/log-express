# log-express

log-express is a lightweight and customizable middleware for Express.js that provides comprehensive logging of all incoming user requests. Designed to be easy to integrate and configure, this package helps you keep track of request details, which can be invaluable for debugging, monitoring, and analyzing traffic patterns.

## Features

- **Customizable Logging**: Choose log levels, enable file logging, and more.
- **Console and File Logging**: Logs can be sent to the console and/or saved to files.
- **Daily Log Rotation**: Optional daily log file creation.
- **Detailed Request Information**: Logs request method, URL, status code, response time, and client IP.

## Installation

To install `log-express`, use npm:

```bash
npm install log-express
```

## Usage

### Basic Setup

To use `log-express` in your Express application, follow these steps:

1.  **Create a new Express application** or open an existing one.
2.  **Install the `log-express` package**.
3.  **Configure and use the middleware** in your application.

```js
const express = require("express");
const log-express = require("log-express"); // Adjust this if the package name is different

const app = express();

// Configure the middleware
const loggerOptions = {
  logLevel: "debug", // Adjust log level: trace, debug, info, warn, error, fatal
  consoleLog: true, // Set to false to disable console logging
  saveLogs: true, // Set to true to enable file logging
  logPerDay: true, // Set to true to enable logging per day (e.g., logs/system-2024-09-05.logs)
};

// Use the middleware
app.use(log-express(loggerOptions));

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/about", (req, res) => {
  res.send("About us page");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
```

### Middleware Options

- **`logLevel`**: Set the logging level. Options: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
- **`consoleLog`**: `true` to log to the console, `false` to disable console logging.
- **`saveLogs`**: `true` to save logs to a file, `false` otherwise.
- **`logPerDay`**: `true` to create a new log file each day, `false` to use a single file.

## Contributing

We welcome contributions to `log-express`. If you'd like to contribute, please follow these steps:

1.  **Fork the repository**: Click on the "Fork" button at the top right of this page.
2.  **Clone your fork**:
    ```bash
    git clone https://github.com/piyushPb/log-express.git
    ```
3.  **Create a new branch**:
    ```bash
    git checkout -b feature-branch
    ```
4.  **Make your changes** and commit them:

    ```bash
    git add .
    git commit -m "Add new feature"
    ```

5.  **Push to your fork**:
    ```bash
    git push origin feature-branch
    ```
6.  **Create a pull request**: Go to the original repository and create a pull request from your fork's branch.

For detailed guidelines, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

`log-express` is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- **Express.js**: The framework that `log-express` extends.
- **Contributors**: Thanks to all contributors who have helped improve the project.

## Contact

For questions or support, please open an issue on [GitHub](https://github.com/PiyushPb/log-express/issues).
