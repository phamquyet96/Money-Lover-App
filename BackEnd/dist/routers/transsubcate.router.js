"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transsubcate_controller_1 = __importDefault(require("../controllers/transsubcate.controller"));
const TransSubCateRouter = express_1.default.Router();
TransSubCateRouter.get("/:transTypeId", transsubcate_controller_1.default.getAllSubCatesByType);
TransSubCateRouter.post("/", transsubcate_controller_1.default.add);
TransSubCateRouter.post("/:subCateId", transsubcate_controller_1.default.update);
// TransSubCateRouter.delete("/:subCateId", TransSubCateController.delete)
exports.default = TransSubCateRouter;
//# sourceMappingURL=transsubcate.router.js.map