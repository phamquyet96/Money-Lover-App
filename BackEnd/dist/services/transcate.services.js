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
const trans_cate_model_1 = __importDefault(require("../models/trans.cate.model"));
let transCateRepo = data_source_1.default.getRepository(trans_cate_model_1.default);
class TransCateServices extends base_services_1.default {
    static getAllCates(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield transCateRepo.find({
                relations: {
                    subCategories: true,
                    transType: true,
                },
                where: {
                    subCategories: {
                        user: {
                            id: user.id,
                        }
                    }
                },
            });
            return result;
        });
    }
}
exports.default = TransCateServices;
//# sourceMappingURL=transcate.services.js.map