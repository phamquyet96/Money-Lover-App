"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const auth_middlewares_1 = __importDefault(require("./middlewares/auth.middlewares"));
const wallet_router_1 = __importDefault(require("./routers/wallet.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.appConfig = new app_config_1.default();
        this.bootstrap();
    }
    bootstrap() {
        this.setupMiddlewares();
        // this.serveStaticFiles();
        this.listen();
    }
    // Static  files
    /* private serveStaticFiles(): void {
          this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
      } */
    setupMiddlewares() {
        this.app.use((0, express_fileupload_1.default)({
            createParentPath: true,
        }));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_session_1.default)({
            name: "session",
            keys: [this.appConfig.sessionKey],
            maxAge: this.appConfig.sessionMaxAge,
        }));
        this.app.use((0, cors_1.default)());
        this.app.use("/api/auth", (0, cors_1.default)(), auth_router_1.default);
        this.app.use(auth_middlewares_1.default.checkAuthentication);
        this.app.use("/api/wallet", wallet_router_1.default);
        this.app.use("/api/user", (0, cors_1.default)(), user_router_1.default);
    }
    listen() {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}
// tslint:disable-next-line:no-unused-expression
new App();
// npm run dev:start
//# sourceMappingURL=app.js.map