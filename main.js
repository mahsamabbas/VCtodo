"use strict";
// Build CLI ToDo application
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var TASKS_FILE = 'tasks.json';
function loadTasks() {
    if (fs.existsSync(TASKS_FILE)) {
        var data = fs.readFileSync(TASKS_FILE, 'utf-8');
        try {
            return JSON.parse(data);
        }
        catch (_a) {
            return [];
        }
    }
    return [];
}
function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}
var tasks = loadTasks();
var nextId = tasks.length > 0 ? Math.max.apply(Math, tasks.map(function (t) { return t.id; })) + 1 : 1;
function addTask(description) {
    var task = { id: nextId++, description: description };
    tasks.push(task);
    saveTasks(tasks);
    console.log("Added: [".concat(task.id, "] ").concat(task.description));
}
function listTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    tasks.forEach(function (task) {
        console.log("[".concat(task.id, "] ").concat(task.description));
    });
}
function removeTask(id) {
    var index = tasks.findIndex(function (t) { return t.id === id; });
    if (index === -1) {
        console.log("Task with id ".concat(id, " not found."));
        return;
    }
    var removed = tasks.splice(index, 1)[0];
    saveTasks(tasks);
    console.log("Removed: [".concat(removed.id, "] ").concat(removed.description));
}
var _a = process.argv, command = _a[2], args = _a.slice(3);
switch (command) {
    case 'add':
        if (args.length === 0) {
            console.log('Usage: node main.js add <task description>');
        }
        else {
            addTask(args.join(' '));
        }
        break;
    case 'list':
        listTasks();
        break;
    case 'remove':
        if (args.length === 0 || isNaN(Number(args[0]))) {
            console.log('Usage: node main.js remove <task id>');
        }
        else {
            removeTask(Number(args[0]));
        }
        break;
    default:
        console.log('Usage: node main.js <add|list|remove> [args]');
}
