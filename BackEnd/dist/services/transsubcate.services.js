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
const base_services_1 = __importDefault(require("./base.services"));
const data_source_1 = __importDefault(require("../database/data-source"));
const trans_subcate_model_1 = __importDefault(require("../models/trans.subcate.model"));
const trans_cate_model_1 = __importDefault(require("../models/trans.cate.model"));
const subcategories_1 = __importDefault(require("../database/subcategories"));
const EntityManager = data_source_1.default.manager;
let transSubCateRepo = data_source_1.default.getRepository(trans_subcate_model_1.default);
let tranCateRepo = data_source_1.default.getRepository(trans_cate_model_1.default);
class TransSubCateServices extends base_services_1.default {
    static getAllSubCatesByType(userId, typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let transSubCates = yield transSubCateRepo.find({
                relations: {
                    category: {
                        transType: true,
                    },
                },
                where: {
                    category: {
                        transType: {
                            id: typeId,
                        },
                    },
                    user: {
                        id: userId
                    }
                },
            });
            return transSubCates;
        });
    }
    static getSubCateById(subCateId) {
        return __awaiter(this, void 0, void 0, function* () {
            let transSubCate = yield transSubCateRepo.findOneBy({ id: subCateId });
            if (!transSubCate) {
                throw new Error("Transaction subcategory not found");
            }
            return transSubCate;
        });
    }
    static add(cateId, userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield transSubCateRepo.save({
                category: cateId,
                user: userId,
                name: name
            });
        });
    }
    static updateSubCate(subCateId, cateId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let transSubCate = yield this.getSubCateById(subCateId);
            let category = yield tranCateRepo.findOneBy({ id: cateId });
            transSubCate.category = category;
            transSubCate.name = name;
            yield transSubCateRepo.save(transSubCate);
            return transSubCate;
        });
    }
    static addDefaultSubCategoriesForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield EntityManager.query(`
      insert into trans_subcate (cate_id, user_id, name) values
      ${(0, subcategories_1.default)(userId)}
    `);
        });
    }
}
exports.default = TransSubCateServices;
//# sourceMappingURL=transsubcate.services.js.map