"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const WalletRouter = express_1.default.Router();
WalletRouter.get('/', wallet_controller_1.default.getAllWalletsOfUser);
WalletRouter.get('/info', wallet_controller_1.default.getDetailInfoOfAllWallets);
WalletRouter.get('/:walletId', wallet_controller_1.default.getWallet);
WalletRouter.get('/info/:walletId', wallet_controller_1.default.getDetailInfoOfWallet);
WalletRouter.patch('/balance', wallet_controller_1.default.adjustBalance);
WalletRouter.get('/balance/total', wallet_controller_1.default.getTotalBalance);
WalletRouter.get('/:walletId/income-expense', wallet_controller_1.default.getTotalIncomeExpenseOfWallet);
WalletRouter.get('/included-in-total/:isIncluded(true|false)', wallet_controller_1.default.getWalletsByIncludedIntotal);
WalletRouter.patch('/', wallet_controller_1.default.updateWallet);
WalletRouter.post('/', wallet_controller_1.default.addWallet);
WalletRouter.delete('/:walletId', wallet_controller_1.default.deleteWallet);
exports.default = WalletRouter;
//# sourceMappingURL=wallet.router.js.map