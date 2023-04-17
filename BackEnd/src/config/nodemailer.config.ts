import nodemailer from "nodemailer";
// tslint:disable-next-line:no-var-requires
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.NODE_MAILER_HOST,
    port: Number(process.env.NODE_MAILER_PORT || 587),
    service: process.env.NODE_MAILER_SERVICE,
    secure:false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
});

export default transporter;
