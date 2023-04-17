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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../database/data-source"));
const base_controller_1 = __importDefault(require("./base.controller"));
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const base_services_1 = __importDefault(require("../services/base.services"));
const userRepo = data_source_1.default.getRepository(user_model_1.default);
class AuthController extends base_controller_1.default {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_services_1.default.register(req.body);
                console.log(user);
                yield auth_services_1.default.sendEmailVerificationRequest(req.body.email);
                res.status(200).json({ message: 'An email has been sent to your email. Please verify your email to continue' });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const [accessToken, refreshToken] = yield auth_services_1.default.checkAuthAndGenerateTokens(email, password);
                res.status(200).json({
                    accessToken,
                    refreshToken,
                });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.user.refreshToken = null;
            yield userRepo.save(req.user);
            res.status(200).json({ message: 'Logged out successfully!' });
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPassword, newPassword } = req.body;
                yield auth_services_1.default.changePassword(req.user, oldPassword, newPassword);
                res.status(200).json({ message: 'Reset password successfully!' });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static loginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepo.findOneBy({ googleId: req.body.sub });
            console.log(user);
            if (!user) {
                req.body.password = base_controller_1.default.getRandomString();
                req.body.image = req.body.picture;
                req.body.googleId = req.body.sub;
                req.body.active = true;
                user = yield auth_services_1.default.register(req.body);
            }
            const accessToken = base_services_1.default.generateAccessToken(user);
            const refreshToken = base_services_1.default.generateRefreshToken(user);
            user.refreshToken = refreshToken;
            yield userRepo.save(user);
            res.status(200).json({
                accessToken,
                refreshToken,
            });
        });
    }
    static verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield auth_services_1.default.verifyEmail(req.body);
                res.status(200).json({ message: "Email verified" });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_services_1.default.sendEmailConfirmResetPassword(req.body);
                res.status(200).json({ message: "We have sent an email to confirm reset password" });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_services_1.default.resetPasswordAndSendPasswordViaEmail(req.body);
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map