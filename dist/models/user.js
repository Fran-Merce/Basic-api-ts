"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const task_1 = require("./task");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: {
        type: String,
        required: false,
        dafaault: 'Make your description  😢',
    },
    age: { type: Number, required: false },
    tasks: [{ type: task_1.ItemModel.schema, required: false, ref: 'tasks' }],
});
exports.UserModel = (0, mongoose_1.model)('users', UserSchema);
