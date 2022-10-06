"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    toDo: { type: Boolean, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.ItemModel = (0, mongoose_1.model)('items', ItemSchema);
