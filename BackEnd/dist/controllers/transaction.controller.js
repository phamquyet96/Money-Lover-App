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
const transaction_services_1 = __importDefault(require("../services/transaction.services"));
const wallet_services_1 = __importDefault(require("../services/wallet.services"));
const [INCOME, EXPENSE] = ["Income", "Expense"];
class TransactionController extends base_controller_1.default {
    static getTransactions(req, res) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date
        let userId = req.user.id;
        transaction_services_1.default.getTransactions(userId, req.query)
            .then(transactions => {
            res.json(transactions);
        });
    }
    static getTransactionsOfOneWallet(req, res) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date
        let walletId = req.params.walletId;
        transaction_services_1.default.getTransactionsOfWallet(walletId, req.query)
            .then(transactions => {
            res.json(transactions);
        });
    }
    static getTransactionsByTypeNameOfAllWallets(req, res) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date;
        // let typeName = req.query.typeName
        let userId = req.user.id;
        transaction_services_1.default.getTransactionsByTypeName(userId, req.query)
            .then(transactions => {
            res.json(transactions);
        });
    }
    static getTransactionsByTypeNameOfOneWallet(req, res) {
        // let month = req.query.month;
        // let year = req.query.year;
        // let date = req.query.date;
        // let typeName = req.query.typeName
        let walletId = req.params.walletId;
        transaction_services_1.default.getTransactionsByTypeNameOfWallet(walletId, req.query)
            .then(transactions => {
            res.json(transactions);
        });
    }
    static addTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { walletId, subcategoryId, money, date, image, note } = req.body;
                yield transaction_services_1.default.addTransaction(walletId, subcategoryId, money, date, image, note);
                yield wallet_services_1.default.updateBalance(walletId);
                res.status(200).json({ message: "Added transaction successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            }
        });
    }
    static updateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let transactionId = Number(req.params.transactionId);
                let transaction = yield transaction_services_1.default.getTransactionById(transactionId);
                let previousWalletId = transaction.wallet.id;
                let currentWalletId = req.body.walletId;
                yield transaction_services_1.default.updateTransaction(transactionId, req.body);
                yield wallet_services_1.default.updateBalance(previousWalletId);
                if (previousWalletId !== currentWalletId) {
                    yield wallet_services_1.default.updateBalance(currentWalletId);
                }
                res.status(200).json({ message: "Updated transaction successfully" });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        });
    }
    static deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.transactionId);
                let transactionId = Number(req.params.transactionId);
                let transaction = yield transaction_services_1.default.getTransactionById(transactionId);
                let walletId = transaction.wallet.id;
                yield transaction_services_1.default.deleteTransaction(transaction);
                yield wallet_services_1.default.updateBalance(walletId);
                res.status(200).json({ message: "Deleted transaction successfully" });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transaction.controller.js.map