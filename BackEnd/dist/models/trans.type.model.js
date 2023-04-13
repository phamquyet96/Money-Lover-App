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
exports.TransType = void 0;
const typeorm_1 = require("typeorm");
const trans_cate_model_1 = __importDefault(require("./trans.cate.model"));
let TransType = class TransType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "int" })
], TransType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: false, unique: true })
], TransType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trans_cate_model_1.default, transCate => transCate.transType)
], TransType.prototype, "transCates", void 0);
TransType = __decorate([
    (0, typeorm_1.Entity)()
], TransType);
exports.TransType = TransType;
exports.default = TransType;
//# sourceMappingURL=trans.type.model.js.map