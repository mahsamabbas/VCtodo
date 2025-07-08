// Build CLI ToDo application

import * as fs from 'fs';
import inquirer from 'inquirer';

interface Task {
  id: number;
  description: string;
}

const TASKS_FILE = 'tasks.json';

function loadTasks(): Task[] {
  if (fs.existsSync(TASKS_FILE)) {
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function saveTasks(tasks: Task[]) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

let tasks: Task[] = loadTasks();
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

function addTask(description: string) {
  const task: Task = { id: nextId++, description };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`Added: [${task.id}] ${task.description}`);
}

function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  tasks.forEach(task => {
    console.log(`[${task.id}] ${task.description}`);
  });
}

function removeTask(id: number) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    console.log(`Task with id ${id} not found.`);
    return;
  }
  const removed = tasks.splice(index, 1)[0];
  saveTasks(tasks);
  console.log(`Removed: [${removed.id}] ${removed.description}`);
}

async function runInteractiveCli() {
  let exit = false;
  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Add Task', 'Remove Task', 'List Tasks', 'Exit'],
      },
    ]);

    switch (action) {
      case 'Add Task': {
        const { description } = await inquirer.prompt([
          {
            type: 'input',
            name: 'description',
            message: 'Enter task description:',
          },
        ]);
        addTask(description);
        break;
      }
      case 'Remove Task': {
        if (tasks.length === 0) {
          console.log('No tasks to remove.');
          break;
        }
        const { id } = await inquirer.prompt([
          {
            type: 'list',
            name: 'id',
            message: 'Select a task to remove:',
            choices: tasks.map(task => ({ name: `[${task.id}] ${task.description}`, value: task.id })),
          },
        ]);
        removeTask(id);
        break;
      }
      case 'List Tasks': {
        listTasks();
        break;
      }
      case 'Exit': {
        exit = true;
        break;
      }
    }
  }
}

if (require.main === module) {
  runInteractiveCli();
}

export { addTask, listTasks, removeTask, loadTasks, saveTasks, Task };
module.exports = { addTask, listTasks, removeTask, loadTasks, saveTasks };