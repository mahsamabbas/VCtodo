"use strict";
// Build CLI ToDo application
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.listTasks = listTasks;
exports.removeTask = removeTask;
exports.loadTasks = loadTasks;
exports.saveTasks = saveTasks;
var fs = require("fs");
var inquirer_1 = require("inquirer");
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
function runInteractiveCli() {
    return __awaiter(this, void 0, void 0, function () {
        var exit, action, _a, description, id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exit = false;
                    _b.label = 1;
                case 1:
                    if (!!exit) return [3 /*break*/, 10];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'action',
                                message: 'What do you want to do?',
                                choices: ['Add Task', 'Remove Task', 'List Tasks', 'Exit'],
                            },
                        ])];
                case 2:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 'Add Task': return [3 /*break*/, 3];
                        case 'Remove Task': return [3 /*break*/, 5];
                        case 'List Tasks': return [3 /*break*/, 7];
                        case 'Exit': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'description',
                            message: 'Enter task description:',
                        },
                    ])];
                case 4:
                    description = (_b.sent()).description;
                    addTask(description);
                    return [3 /*break*/, 9];
                case 5:
                    if (tasks.length === 0) {
                        console.log('No tasks to remove.');
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'id',
                                message: 'Select a task to remove:',
                                choices: tasks.map(function (task) { return ({ name: "[".concat(task.id, "] ").concat(task.description), value: task.id }); }),
                            },
                        ])];
                case 6:
                    id = (_b.sent()).id;
                    removeTask(id);
                    return [3 /*break*/, 9];
                case 7:
                    {
                        listTasks();
                        return [3 /*break*/, 9];
                    }
                    _b.label = 8;
                case 8:
                    {
                        exit = true;
                        return [3 /*break*/, 9];
                    }
                    _b.label = 9;
                case 9: return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    runInteractiveCli();
}
module.exports = { addTask: addTask, listTasks: listTasks, removeTask: removeTask, loadTasks: loadTasks, saveTasks: saveTasks };
