// Build CLI ToDo application

interface Task {
  id: number;
  description: string;
}

let tasks: Task[] = [];
let nextId = 1;

function addTask(description: string) {
  const task: Task = { id: nextId++, description };
  tasks.push(task);
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