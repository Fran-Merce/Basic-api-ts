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
exports.getItems = exports.deleteItem = exports.postItem = exports.updateItenm = exports.getItem = void 0;
const error_handle_1 = require("../helpers/error.handle");
const task_service_1 = require("../services/task.service");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const responseTodo = yield (0, task_service_1.getTodo)(id, `${req.headers.user}`);
        const data = responseTodo ? responseTodo : { ERROR: 'NOT_FOUND' };
        res.send(data);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Error on get item');
    }
});
exports.getItem = getItem;
const updateItenm = ({ params, body, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = params;
        if (!headers.user)
            return res.send({ error: 'NOT_FOUND_USER' });
        res.send(yield (0, task_service_1.updateTodo)(id, body, `${headers.user}`));
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Error on UPDATE item');
    }
});
exports.updateItenm = updateItenm;
const postItem = ({ body, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!headers.user)
        return res.send({ error: 'NOT_FOUND_USER' });
    if (typeof headers.user !== 'string')
        return res.send({ error: 'ID_NOT_VALID' });
    try {
        const responseTodo = yield (0, task_service_1.insertTodo)(body, headers.user);
        res.send(responseTodo);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, `error on post item ${error}`);
    }
});
exports.postItem = postItem;
const deleteItem = ({ params, headers }, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!headers.user)
        return res.send({ error: 'NOT_FOUND_USER' });
    try {
        const { id } = params;
        const response = yield (0, task_service_1.deleteTodo)(id, `${headers.user}`);
        if (!response)
            return res.send({ ERROR: 'NOT_FOUND' });
        res.send({ message: 'Item deleted', data: response });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Error on delete item');
    }
});
exports.deleteItem = deleteItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.user)
        return res.send({ error: 'NOT_FOUND_USER' });
    try {
        const responseTodo = yield (0, task_service_1.getTodos)(`${req.headers.user}`);
        if (!responseTodo)
            return res.send({ error: 'NOT_FOUND_USER_OR_ITEMS' });
        res.send(responseTodo);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'NOT_FOUND_USER_OR_ITEMS');
    }
});
exports.getItems = getItems;
