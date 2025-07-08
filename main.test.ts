import { addTask, listTasks, removeTask, loadTasks, saveTasks, Task } from './main';
import * as fs from 'fs';

describe('ToDo CLI Functions', () => {
  const TASKS_FILE = 'tasks.json';
  let originalTasks: Task[] = [];

  beforeAll(() => {
    if (fs.existsSync(TASKS_FILE)) {
      originalTasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8'));
    }
  });

  afterAll(() => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(originalTasks, null, 2));
  });

  beforeEach(() => {
    fs.writeFileSync(TASKS_FILE, '[]');
  });

  test('addTask adds a new task', () => {
    addTask('Test task');
    const tasks = loadTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Test task');
  });

  test('listTasks lists all tasks', () => {
    addTask('Task 1');
    addTask('Task 2');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    listTasks();
    expect(consoleSpy).toHaveBeenCalledWith('[1] Task 1');
    expect(consoleSpy).toHaveBeenCalledWith('[2] Task 2');
    consoleSpy.mockRestore();
  });

  test('removeTask removes a task by id', () => {
    addTask('Task to remove');
    let tasks = loadTasks();
    expect(tasks.length).toBe(1);
    removeTask(tasks[0].id);
    tasks = loadTasks();
    expect(tasks.length).toBe(0);
  });

  test('loadTasks returns empty array if file does not exist', () => {
    if (fs.existsSync(TASKS_FILE)) fs.unlinkSync(TASKS_FILE);
    expect(loadTasks()).toEqual([]);
  });

  test('saveTasks writes tasks to file', () => {
    const tasks: Task[] = [{ id: 1, description: 'Saved task' }];
    saveTasks(tasks);
    const loaded = loadTasks();
    expect(loaded).toEqual(tasks);
  });
});
