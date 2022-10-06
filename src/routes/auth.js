"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
exports.router = (0, express_1.Router)();
exports.router.post('/register', auth_1.registerCtrl);
exports.router.post('/login', auth_1.loginCtrl);
