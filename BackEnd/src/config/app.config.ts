// tslint:disable-next-line:no-var-requires
require('dotenv').config();

class AppConfig{
    name: string = process.env.APP_NAME || 'MONEY LOVER';
    port: number = Number(process.env.SV_PORT || 8000);
    host: string = process.env.APP_HOST || '127.0.0.1';
    expiredStaticFiles = process.env.APP_EXPIRED_STATIC_FILES || '31557600000';
    sessionKey: string = process.env.SESSION_KEY;
    sessionMaxAge: number = Number(process.env.SESSION_MAX_AGE);
    baseURL: string = process.env.BASE_URL || 'http://localhost:3000';
}

export default AppConfig;
