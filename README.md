# TypeScript CLI ToDo Application

This is a simple interactive ToDo application built with TypeScript and Node.js. It allows you to add, list, and remove tasks from a persistent task list using a user-friendly command-line interface.

## Features
- Interactive CLI with arrow-key navigation (powered by [inquirer](https://www.npmjs.com/package/inquirer))
- Add new tasks
- Remove existing tasks (select from a list)
- List all tasks
- Tasks are saved in a `tasks.json` file for persistence

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) installed

### Installation
1. Clone or download this repository.
2. Install dependencies:
   ```
   npm install
   ```

### Usage
To start the interactive CLI, run:
```
node main.js
```

You will see a menu with the following options:
- **Add Task**: Enter a description to add a new task.
- **Remove Task**: Select a task from the list to remove it.
- **List Tasks**: View all current tasks.
- **Exit**: Quit the application.

All tasks are saved in `tasks.json` in the project directory.

### Running Tests
This project uses Jest for unit testing. To run the tests:
```
npx jest
```

## Project Structure
- `main.ts` - Main application logic and CLI
- `main.test.ts` - Unit tests for all functions
- `tasks.json` - Persistent storage for tasks (auto-created)

## Notes
- The app uses TypeScript. If you modify the code, recompile with `npx tsc` if needed.
- The CLI is fully interactive; use the arrow keys and Enter to navigate.

## License
MIT
