"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
class DataBaseConfig {
    constructor() {
        this.type = process.env.DB_CONNECTION || 'mysql';
        this.host = process.env.DB_HOST || '127.0.0.1';
        this.port = Number(process.env.DB_PORT) || 3306;
        this.username = process.env.DB_USER || 'root';
        this.password = process.env.DB_PASS || '123456';
        this.database = process.env.DB_NAME || 'money_lover';
        this.synchronize = true; // chú ý chuyển khi khởi tạo database **** chuyển sang true
        this.logging = false;
        this.entities = "./dist/models/*.js";
        this.migrations = "./dist/database/migrations/*.js";
    }
}
exports.default = DataBaseConfig;
//# sourceMappingURL=database.config.js.map