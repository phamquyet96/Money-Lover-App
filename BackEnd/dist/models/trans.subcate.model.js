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
exports.TransSubCate = void 0;
const typeorm_1 = require("typeorm");
const trans_cate_model_1 = __importDefault(require("./trans.cate.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const user_model_1 = __importDefault(require("./user.model"));
let TransSubCate = class TransSubCate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "int" })
], TransSubCate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trans_cate_model_1.default, transCate => transCate.subCategories),
    (0, typeorm_1.JoinColumn)({ name: "cate_id" })
], TransSubCate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: false })
], TransSubCate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_model_1.default, transaction => transaction.subCategory)
], TransSubCate.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, user => user.transSubCates),
    (0, typeorm_1.JoinColumn)({ name: "user_id" })
], TransSubCate.prototype, "user", void 0);
TransSubCate = __decorate([
    (0, typeorm_1.Entity)("trans_subcate"),
    (0, typeorm_1.Index)(["category", "name"], { unique: true })
], TransSubCate);
exports.TransSubCate = TransSubCate;
exports.default = TransSubCate;
//# sourceMappingURL=trans.subcate.model.js.map