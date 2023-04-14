"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transcate_controller_1 = __importDefault(require("../controllers/transcate.controller"));
const TransCateRouter = express_1.default.Router();
const transCateController = new transcate_controller_1.default();
TransCateRouter.get('/', transCateController.getAllCates);
exports.default = TransCateRouter;
//# sourceMappingURL=transcate.router.js.map