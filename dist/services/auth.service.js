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
exports.loginUser = exports.registerNewUser = void 0;
const bcrypt_handle_1 = require("../helpers/bcrypt.handle");
const jwt_handle_1 = require("../helpers/jwt.handle");
const user_1 = require("../models/user");
const registerNewUser = ({ email, password, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIsUserExist = yield user_1.UserModel.findOne({ email });
    const checkIsNameExist = yield user_1.UserModel.findOne({ name });
    if (checkIsUserExist)
        return 'Email already exist';
    if (checkIsNameExist)
        return 'Name already exist';
    const passwordHash = yield (0, bcrypt_handle_1.encrypt)(password);
    return yield user_1.UserModel.create({ email, password: passwordHash, name });
});
exports.registerNewUser = registerNewUser;
const loginUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIs = yield user_1.UserModel.findOne({ email });
    if (!checkIs)
        return { error: 'NOT_FOUND_USER' };
    const passwordHash = checkIs.password;
    const isMatch = yield (0, bcrypt_handle_1.verified)({ password, passwordHash });
    if (!isMatch)
        return { error: 'WRONG_PASSWORD_OR_EMAIL' };
    const token = yield (0, jwt_handle_1.GenerateToken)(checkIs.email);
    return { token, user: checkIs };
});
exports.loginUser = loginUser;
