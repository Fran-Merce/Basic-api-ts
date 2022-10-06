"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const items_1 = require("../controllers/items");
const session_1 = require("../middlewares/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/all', session_1.checkSession, items_1.getItems);
router.get('/:id', session_1.checkSession, items_1.getItem);
router.post('/', session_1.checkSession, items_1.postItem);
router.put('/:id', session_1.checkSession, items_1.updateItenm);
router.delete('/:id', session_1.checkSession, items_1.deleteItem);