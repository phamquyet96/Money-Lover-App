"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
class AppConfig {
    constructor() {
        this.name = process.env.APP_NAME || 'MONEY LOVER';
        this.port = Number(process.env.SV_PORT || 8000);
        this.host = process.env.APP_HOST || '127.0.0.1';
        this.expiredStaticFiles = process.env.APP_EXPIRED_STATIC_FILES || '31557600000';
        this.sessionKey = process.env.SESSION_KEY;
        this.sessionMaxAge = Number(process.env.SESSION_MAX_AGE);
        this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
    }
}
exports.default = AppConfig;
//# sourceMappingURL=app.config.js.map