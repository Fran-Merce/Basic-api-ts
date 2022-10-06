"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddleware = void 0;
const logMiddleware = (req, res, next) => {
    console.log('Request: ', req.method, req.path);
    const userAgent = req.headers['user-agent'];
    console.log('User-Agent: ', userAgent);
    next();
};
exports.logMiddleware = logMiddleware;
