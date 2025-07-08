// Build CLI ToDo application

import * as fs from 'fs';

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

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    if (args.length === 0) {
      console.log('Usage: node main.js add <task description>');
    } else {
      addTask(args.join(' '));
    }
    break;
  case 'list':
    listTasks();
    break;
  case 'remove':
    if (args.length === 0 || isNaN(Number(args[0]))) {
      console.log('Usage: node main.js remove <task id>');
    } else {
      removeTask(Number(args[0]));
    }
    break;
  default:
    console.log('Usage: node main.js <add|list|remove> [args]');
}