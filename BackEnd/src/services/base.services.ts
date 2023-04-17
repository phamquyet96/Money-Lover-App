import dataSource from "../database/data-source";
import User from "../models/user.model";
import UserServices from "./user.services";
import jwt from 'jsonwebtoken';

const userRepo = dataSource.getRepository(User);

class BaseServices {
    static async validateEmail(email: string): Promise<void> {

        if (!email) {
            throw new Error("Email is required");
        }
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isValidEmail = regEmail.test(email);
        if (!isValidEmail) {
            throw new Error("Invalid email");
        }
        const user = await UserServices.getUserByEmail(email);
        if (user) {
            throw new Error("Email already exists");
        }
    }
    static async validatePassword(password: string): Promise<void> {
        if (!password) {
            throw new Error("Password is required");
        }
    }

    static getRandomString(): string {
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += Math.floor(Math.random() * 10).toString();
        }
        return randomString;
    }

    static generateAccessToken(user: User): string {
        const { id, email, name, image } = user;
        const payload = { id, email, name, image };
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "15m" }
        );
    }

    static generateRefreshToken(user: User): string {
        const { id, email, name, image } = user;
        const payload = { id, email, name, image };
        return jwt.sign(payload, `${process.env.JWT_REFRESH_KEY}`);
    };

    static generateTokenFromString(email: string): string {
        return jwt.sign(email, `${process.env.JWT_REFRESH_KEY}`);
    }
}

export default BaseServices;

