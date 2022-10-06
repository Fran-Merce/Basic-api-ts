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
exports.checkSession = void 0;
const jwt_handle_1 = require("../helpers/jwt.handle");
const task_service_1 = require("../services/task.service");
const checkSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (typeof isUser === 'string')
            return res.send({ error: 'NOT_FOUND_USER' });
        const userEmail = isUser.id || '';
        const userOnDb = yield (0, task_service_1.getUser)(req.headers.user);
        if (!userOnDb)
            return res.status(400).send({ error: 'NOT_FOUND_USER' });
        if (userEmail !== userOnDb.email)
            return res.send({ error: 'USER_AUTH_AND_USER_ID_ARE_DIFFERENTS' });
        if (!isUser)
            return res.status(401).send({ message: 'Unauthorized_invalid_session' });
        next();
    }
    catch (error) {
        res.status(400).send({ message: 'Invalid session' });
    }
});
exports.checkSession = checkSession;
