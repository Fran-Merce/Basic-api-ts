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
exports.loginCtrl = exports.registerCtrl = void 0;
const auth_service_1 = require("../services/auth.service");
const registerCtrl = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_service_1.registerNewUser)(body);
    res.send(user);
});
exports.registerCtrl = registerCtrl;
const loginCtrl = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const responseUser = yield (0, auth_service_1.loginUser)({ email, password });
    if (responseUser.error) {
        responseUser.error === 'WRONG_PASSWORD_OR_EMAIL' && res.status(403);
        res.send({ error: responseUser.error });
        return;
    }
    const { token, user } = responseUser;
    res.send({
        message: 'LOGIN_SUCCESS',
        data: {
            token,
            userData: {
                email: user === null || user === void 0 ? void 0 : user.email,
                name: user === null || user === void 0 ? void 0 : user.name,
                id: user === null || user === void 0 ? void 0 : user._id,
            },
        },
    });
});
exports.loginCtrl = loginCtrl;
