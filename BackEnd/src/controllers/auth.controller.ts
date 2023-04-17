import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dataSource from "../database/data-source";
import BaseController from "./base.controller";
import User from "../models/user.model";
import AuthServices from "../services/auth.services";
import BaseServices from "../services/base.services";
import UserServices from "../services/user.services";


const userRepo = dataSource.getRepository(User);

class AuthController extends BaseController {

    static async register(req: Request, res: Response) {
        try {
            const user = await AuthServices.register(req.body);
            console.log(user)
            await AuthServices.sendEmailVerificationRequest(req.body.email);
            res.status(200).json({ message: 'An email has been sent to your email. Please verify your email to continue' });
        }
        catch (err: any) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage })
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const [accessToken, refreshToken] = await AuthServices.checkAuthAndGenerateTokens(email, password);
            res.status(200).json({
                accessToken,
                refreshToken,
            });
        }
        catch (err: any) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage });
        }
    }
    static async logout(req, res) {
        req.user.refreshToken = null;
        await userRepo.save(req.user);
        res.status(200).json({ message: 'Logged out successfully!' });
    }

    static async changePassword(req: Request, res: Response) {
        try {
            const { oldPassword, newPassword } = req.body;
            await AuthServices.changePassword(req.user, oldPassword, newPassword);
            res.status(200).json({ message: 'Reset password successfully!' })
        }
        catch (err) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage })
        }
    }

    static async loginWithGoogle(req, res) {
        let user = await userRepo.findOneBy({ googleId: req.body.sub });
        console.log(user)
        if (!user) {
            req.body.password = BaseController.getRandomString();
            req.body.image = req.body.picture;
            req.body.googleId = req.body.sub;
            req.body.active = true;
            user = await AuthServices.register(req.body);
        }
        const accessToken = BaseServices.generateAccessToken(user);
        const refreshToken = BaseServices.generateRefreshToken(user);
        user.refreshToken = refreshToken
        await userRepo.save(user)
        res.status(200).json({
            accessToken,
            refreshToken,
        });
    }

    static async verifyEmail(req: Request, res: Response) {
        try {
            console.log(req.body)
            await AuthServices.verifyEmail(req.body);
            res.status(200).json({ message: "Email verified" });
        }
        catch (err) {
            res.status(500).json({message: err.message || this.defaultErrorMessage});
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            await AuthServices.sendEmailConfirmResetPassword(req.body);
            res.status(200).json({message: "We have sent an email to confirm reset password"})
        }
        catch (err) {
            res.status(500).json({message: err.message || this.defaultErrorMessage});
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            await AuthServices.resetPasswordAndSendPasswordViaEmail(req.body);
        }
        catch (err) {
            res.status(500).json({message: err.message || this.defaultErrorMessage});
        }
    }
}

export default AuthController;