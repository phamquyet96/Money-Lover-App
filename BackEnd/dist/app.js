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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const auth_middlewares_1 = __importDefault(require("./middlewares/auth.middlewares"));
const transsubcate_router_1 = __importDefault(require("./routers/transsubcate.router"));
const transaction_router_1 = __importDefault(require("./routers/transaction.router"));
const wallet_router_1 = __importDefault(require("./routers/wallet.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const transtype_router_1 = __importDefault(require("./routers/transtype.router"));
const transcate_router_1 = __importDefault(require("./routers/transcate.router"));
const data_source_1 = __importDefault(require("./database/data-source"));
const transaction_model_1 = __importDefault(require("./models/transaction.model"));
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
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_session_1.default)({
            name: "session",
            keys: [this.appConfig.sessionKey],
            maxAge: this.appConfig.sessionMaxAge,
        }));
        this.app.use((0, cors_1.default)({
            credentials: true,
            origin: this.appConfig.baseURL,
            methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
        }));
        // Test
        this.app.use('/test', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let transactionRepo = data_source_1.default.getRepository(transaction_model_1.default);
            let result = yield transactionRepo.createQueryBuilder('trans')
                .where('trans.date >= :startDate', { startDate: '2023-02-22' })
                .getMany();
            res.json(result);
        }));
        //
        this.app.use("/api/auth", auth_router_1.default);
        this.app.use(auth_middlewares_1.default.checkAuthentication);
        this.app.use("/api/wallet", wallet_router_1.default);
        this.app.use("/api/transaction-subcategory", transsubcate_router_1.default);
        this.app.use("/api/transaction-category", transcate_router_1.default);
        this.app.use("/api/user", user_router_1.default);
        this.app.use("/api/transaction", transaction_router_1.default);
        this.app.use("/api/type", transtype_router_1.default);
    }
    listen() {
        this.app.listen(this.appConfig.port, () => {
            console.log(`server started at http://localhost:${this.appConfig.port}`);
        });
    }
}
// tslint:disable-next-line:no-unused-expression
new App();
//npm run dev:start
//# sourceMappingURL=app.js.map