"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
require('dotenv').config();
const AuthRouter = express_1.default.Router();
AuthRouter.post('/register', auth_controller_1.default.register);
AuthRouter.post('/login', auth_controller_1.default.login);
AuthRouter.post('/refresh', auth_middlewares_1.default.refreshToken);
AuthRouter.get('/logout', auth_middlewares_1.default.checkAuthentication, auth_controller_1.default.logout);
AuthRouter.post('/change-password', auth_middlewares_1.default.checkAuthentication, auth_controller_1.default.changePassword);
AuthRouter.post('/login/google', auth_controller_1.default.loginWithGoogle);
AuthRouter.post('/verify', auth_controller_1.default.verifyEmail);
AuthRouter.post('/forgot-password', auth_controller_1.default.forgotPassword);
AuthRouter.post('/reset-password', auth_controller_1.default.resetPassword);
exports.default = AuthRouter;
//# sourceMappingURL=auth.router.js.map