import bcrypt from "bcrypt";
import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import UserServices from "./user.services";
import transporter from "../config/nodemailer.config";
import jwt from "jsonwebtoken";
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

const userRepo = dataSource.getRepository(User);

class AuthServices extends BaseServices {

    static async register({ name, email, password, googleId, image, refreshToken, active }): Promise<User> {
        console.log(email);
        await this.validateEmail(email);
        await this.validatePassword(password);
        const user = new User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.name = name;
        user.image = image;
        user.googleId = googleId;
        user.refreshToken = refreshToken;
        user.active = active;
        await userRepo.save(user);
        return user
    }

    static async checkAuthAndGenerateTokens(email, password): Promise<string[]> {
        const user = await UserServices.getUserByEmail(email);
        if (!user) {
            throw new Error("Wrong email or password");
        }
        const match = await bcrypt.compare(password, user.password);
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
    }

    static async changePassword(user, oldPassword, newPassword) {
        const oldPasswords = user.password;
        const confirmPasswordSuccess = await bcrypt.compare(oldPassword, oldPasswords);
        console.log(confirmPasswordSuccess)
        if (confirmPasswordSuccess) {
            user.password = await bcrypt.hash(newPassword, 10);
            await userRepo.save(user);
        }
        else {
            throw new Error("Password Mismatch");
        }
    }

    static async sendEmailVerificationRequest(email: string): Promise<void> {
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
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        })
    }

    static async verifyEmail({ token }): Promise<void> {
        jwt.verify(token, `${process.env.JWT_REFRESH_KEY}`, async (err, decoded) => {
            const user = await UserServices.getUserByEmail(decoded);
            user.active = true;
            await userRepo.save(user);
            return;
        })
    }

    static async resetPasswordAndSendPasswordViaEmail({ token }): Promise<void> {
        jwt.verify(token, `${process.env.JWT_REFRESH_KEY}`, async (err, decoded) => {
            const user = await UserServices.getUserByEmail(decoded);
            const newPassword = this.getRandomString();
            user.password = await bcrypt.hash(newPassword, 10);
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
            }
            // tslint:disable-next-line:no-shadowed-variable
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Message sent: ' + info.response);
                }
            })
        })

    }

    static async sendEmailConfirmResetPassword({ email }): Promise<void> {
        const user = await UserServices.getUserByEmail(email);
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
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        })
    }
}

export default AuthServices;