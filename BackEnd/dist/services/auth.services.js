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
const bcrypt_1 = __importDefault(require("bcrypt"));
const base_services_1 = __importDefault(require("./base.services"));
const data_source_1 = __importDefault(require("../database/data-source"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_services_1 = __importDefault(require("./user.services"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
const userRepo = data_source_1.default.getRepository(user_model_1.default);
class AuthServices extends base_services_1.default {
    static register({ name, email, password, googleId, image, refreshToken, active }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            yield this.validateEmail(email);
            yield this.validatePassword(password);
            const user = new user_model_1.default();
            user.email = email;
            user.password = yield bcrypt_1.default.hash(password, 10);
            user.name = name;
            user.image = image;
            user.googleId = googleId;
            user.refreshToken = refreshToken;
            user.active = active;
            yield userRepo.save(user);
            return user;
        });
    }
    static checkAuthAndGenerateTokens(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getUserByEmail(email);
            if (!user) {
                throw new Error("Wrong email or password");
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                throw new Error("Wrong email or password");
            }
            // if (!user.active) {
            //     throw new Error("Please verify your email to login");
            // }
            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);
            user.refreshToken = refreshToken;
            userRepo.save(user);
            return [accessToken, refreshToken];
        });
    }
    static changePassword(user, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldPasswords = user.password;
            const confirmPasswordSuccess = yield bcrypt_1.default.compare(oldPassword, oldPasswords);
            console.log(confirmPasswordSuccess);
            if (confirmPasswordSuccess) {
                user.password = yield bcrypt_1.default.hash(newPassword, 10);
                yield userRepo.save(user);
            }
            else {
                throw new Error("Password Mismatch");
            }
        });
    }
    static sendEmailVerificationRequest(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.generateTokenFromString(email);
            const options = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: 'Money Lover Email Verification',
                html: `
            <div>
                <span>Dear New User</span>
                <p>
                    You have just registered a Money Lover account.<br/>
                    Please click the following link to verify your email:
                </p>
                <a href="http://localhost:3000/verify/${token}">
                    http://localhost:3000/verify/${token}
                </a>
                <p>
                    Please ignore this email if you didn't register.
                </p>
            </div>
            `
            };
            nodemailer_config_1.default.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Message sent: ' + info.response);
                }
            });
        });
    }
    static verifyEmail({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            jsonwebtoken_1.default.verify(token, `${process.env.JWT_REFRESH_KEY}`, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_services_1.default.getUserByEmail(decoded);
                user.active = true;
                yield userRepo.save(user);
                return;
            }));
        });
    }
    static resetPasswordAndSendPasswordViaEmail({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            jsonwebtoken_1.default.verify(token, `${process.env.JWT_REFRESH_KEY}`, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_services_1.default.getUserByEmail(decoded);
                const newPassword = this.getRandomString();
                user.password = yield bcrypt_1.default.hash(newPassword, 10);
                userRepo.save(user);
                const options = {
                    from: process.env.AUTH_EMAIL,
                    to: decoded,
                    subject: 'Money Lover Password Reset',
                    html: `
            <div>
                <span>Dear New User</span>
                <p>
                    You have just reset your pass for Money Lover account.<br/>
                    Please use the following password to login: ${newPassword}
                </p>
            </div>
            `
                };
                // tslint:disable-next-line:no-shadowed-variable
                nodemailer_config_1.default.sendMail(options, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }));
        });
    }
    static sendEmailConfirmResetPassword({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getUserByEmail(email);
            if (!user) {
                throw new Error('There is no account associated with this email');
            }
            const token = this.generateTokenFromString(email);
            const options = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: 'Money Lover Confirm Reset Password',
                html: `
            <div>
                <span>Dear New User</span>
                <p>
                    You have just requested to reset password your Money Lover account.<br/>
                    Please click the following link to confirm reset password:
                </p>
                <a href="http://localhost:3000/reset-password/${token}">
                    http://localhost:3000/reset-password/${token}
                </a>
                <p>
                    Please ignore this email if you didn't request to reset your password.
                </p>
            </div>
            `
            };
            nodemailer_config_1.default.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Message sent: ' + info.response);
                }
            });
        });
    }
}
exports.default = AuthServices;
//# sourceMappingURL=auth.services.js.map