"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const TransactionRouter = express_1.default.Router();
TransactionRouter.delete('/:transactionId', transaction_controller_1.default.deleteTransaction);
TransactionRouter.get('/', transaction_controller_1.default.getTransactions);
TransactionRouter.get('/type', transaction_controller_1.default.getTransactionsByTypeNameOfAllWallets);
TransactionRouter.get('/:walletId', transaction_controller_1.default.getTransactionsOfOneWallet);
TransactionRouter.get('/:walletId/detail', transaction_controller_1.default.getTransactionsByTypeNameOfOneWallet);
TransactionRouter.post('/', transaction_controller_1.default.addTransaction);
TransactionRouter.put('/:transactionId', transaction_controller_1.default.updateTransaction);
exports.default = TransactionRouter;
//# sourceMappingURL=transaction.router.js.map