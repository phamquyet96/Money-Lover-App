"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = __importDefault(require("./user.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
let Wallet = class Wallet {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "int" })
    //@ts-ignore
], Wallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, user => user.wallets, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" })
    //@ts-ignore
], Wallet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: false })
    //@ts-ignore
], Wallet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "balance", type: "int", nullable: false })
    //@ts-ignore
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "initial_balance", type: "int", nullable: false })
    //@ts-ignore
], Wallet.prototype, "initialBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "include_total", type: "boolean", default: true })
    //@ts-ignore
], Wallet.prototype, "includeTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "active", type: "boolean", default: true })
    //@ts-ignore
], Wallet.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_model_1.default, transaction => transaction.wallet, {
        cascade: true
    })
    //@ts-ignore
], Wallet.prototype, "transactions", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["user", "name"], { unique: true })
], Wallet);
exports.Wallet = Wallet;
exports.default = Wallet;
//# sourceMappingURL=wallet.model.js.map