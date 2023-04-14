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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const wallet_model_1 = __importDefault(require("./wallet.model"));
const trans_subcate_model_1 = __importDefault(require("./trans.subcate.model"));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id", type: "int" })
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "email", type: "varchar", length: 255, nullable: false, unique: true })
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password", type: "varchar", length: 255, nullable: false })
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 255, nullable: true })
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image", type: "varchar", length: 500, nullable: true })
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "google_id", type: "varchar", length: 500, nullable: true })
    //@ts-ignore
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "facebook_id", type: "varchar", length: 500, nullable: true })
    //@ts-ignore
], User.prototype, "facebookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "github_id", type: "varchar", length: 500, nullable: true })
    //@ts-ignore
], User.prototype, "githubId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wallet_model_1.default, wallet => wallet.user, {
        cascade: true
    })
], User.prototype, "wallets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trans_subcate_model_1.default, transSubCate => transSubCate.user, {
        cascade: true
    })
    //@ts-ignore
], User.prototype, "transSubCates", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "refresh_token", type: "longtext", nullable: true })
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "active", type: "boolean", nullable: false, default: false })
], User.prototype, "active", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
exports.default = User;
//# sourceMappingURL=user.model.js.map