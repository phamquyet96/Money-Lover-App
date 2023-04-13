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
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const wallet_model_1 = __importDefault(require("./wallet.model"));
const trans_subcate_model_1 = __importDefault(require("./trans.subcate.model"));
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "int" })
    //@ts-ignore
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_model_1.default, wallet => wallet.transactions, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "wallet_id" })
    //@ts-ignore
], Transaction.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trans_subcate_model_1.default, transSubCate => transSubCate.transactions),
    (0, typeorm_1.JoinColumn)({ name: "subcategory_id" })
    //@ts-ignore
], Transaction.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "money", type: "int", nullable: false })
], Transaction.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "date", type: "date", nullable: false })
], Transaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "note", type: "varchar", length: 255, nullable: true })
], Transaction.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image", type: "varchar", length: 500, nullable: true })
], Transaction.prototype, "image", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
exports.Transaction = Transaction;
exports.default = Transaction;
//# sourceMappingURL=transaction.model.js.map