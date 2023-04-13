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
const base_controller_1 = __importDefault(require("./base.controller"));
const transsubcate_services_1 = __importDefault(require("../services/transsubcate.services"));
class TransSubCateController extends base_controller_1.default {
    static getAllSubCatesByType(req, res) {
        let userId = req.user.id;
        let transTypeId = Number(req.params.transTypeId);
        transsubcate_services_1.default.getAllSubCatesByType(userId, transTypeId)
            .then((transSubCates) => {
            res.status(200).json(transSubCates);
        })
            .catch((err) => {
            res.status(500).json(err);
        });
    }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { cateId, name } = req.body;
                yield transsubcate_services_1.default.add(cateId, req.user.id, name);
                res.status(200).json({ message: "Added subCategory successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCateId = req.params.subCateId;
                let { cateId, name } = req.body;
                yield transsubcate_services_1.default.updateSubCate(subCateId, cateId, name);
                res.status(200).json({ message: 'Update subcategory successfully' });
            }
            catch (e) {
                res.status(500).json({ message: e.message });
            }
        });
    }
    static addDefaultSubCategoriesForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transsubcate_services_1.default.addDefaultSubCategoriesForUser(req.user.id);
                res.status(200).json({ message: "success" });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = TransSubCateController;
//# sourceMappingURL=transsubcate.controller.js.map