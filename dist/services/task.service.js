"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.insertTodo = exports.getUser = void 0;
const task_1 = require("../models/task");
const user_1 = require("../models/user");
// Todo handle resposnes with status codes and messages
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findById(id);
    if (!user)
        return null;
    return user;
});
exports.getUser = getUser;
const insertTodo = (item, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUser)(userId);
    const newItem = new task_1.ItemModel({
        desc: item.desc,
        title: item.title,
        toDo: item.toDo,
    });
    if (!user || !user.tasks)
        return false;
    const tasks = user === null || user === void 0 ? void 0 : user.tasks;
    const isOnDb = tasks.find(task => task.title === item.title) ? false : true;
    if (isOnDb)
        return false;
    tasks.push(newItem);
    yield user.save();
    return true;
});
exports.insertTodo = insertTodo;
const getTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUser)(userId);
    if (!user)
        return null;
    return user.tasks;
});
exports.getTodos = getTodos;
const getTodo = (id, idUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUser)(idUser);
    if (!user)
        return null;
    const tasks = user.tasks;
    const task = tasks.find(task => task._id.toString() === id);
    console.log(task, 'task');
    if (!task)
        return null;
    return task;
});
exports.getTodo = getTodo;
const updateTodo = (id, item, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, 'userId');
    const user = yield (0, exports.getUser)(userId);
    if (!user)
        return null;
    const newTaks = user.tasks.map(task => (task._id.toString() === id ? item : task));
    user.tasks = newTaks;
    yield user.save();
    return { message: 'Item updated', data: item };
});
exports.updateTodo = updateTodo;
const deleteTodo = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUser)(userId);
    if (!(user === null || user === void 0 ? void 0 : user.tasks))
        return null;
    const existTask = user.tasks.find(task => task._id.toString() === id);
    if (!existTask)
        return null;
    const newTaks = user.tasks.filter(task => task._id.toString() !== id);
    user.tasks = newTaks;
    yield user.save();
    return newTaks;
});
exports.deleteTodo = deleteTodo;
