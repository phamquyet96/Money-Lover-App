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
class WalletController extends base_controller_1.default {
    static getAllWalletsOfUser(req, res) {
        //@ts-ignore
        let userId = req.user.id;
        wallet_services_1.default.getAllWalletsOfUser(userId)
            .then(wallets => {
            res.status(200).json(wallets);
        })
            .catch(err => {
            res.status(500).json(err);
        });
    }
    static getDetailInfoOfWallet(req, res) {
        let walletId = Number(req.params.walletId);
        wallet_services_1.default.getAllInfoOfWallet(walletId)
            .then(wallet => {
            res.json(wallet);
        });
    }
    static getDetailInfoOfAllWallets(req, res) {
        //@ts-ignore
        let userId = req.user.id;
        wallet_services_1.default.getALlWalletsInfoOfUser(userId)
            .then(wallets => {
            res.json(wallets);
        });
    }
    static getWallet(req, res) {
        let walletId = Number(req.params.walletId);
        wallet_services_1.default.getWalletById(walletId)
            .then(wallet => {
            res.status(200).json(wallet);
        })
            .catch(err => {
            res.status(500).json({ message: err.message || this.defaultErrorMessage });
        });
    }
    static adjustBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { walletId, balance } = req.body;
                yield transaction_services_1.default.addTransactionToAdjustBalance(req.user.id, walletId, balance);
                yield wallet_services_1.default.updateBalance(walletId);
                res.status(200).json({ message: "Adjusted balance succesfully!" });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static getTotalBalance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                let totalBalance = yield wallet_services_1.default.getTotalBalance(req.user.id);
                return res.status(200).json(totalBalance);
            }
            catch (err) {
                res.status(500).json(err.message || this.defaultErrorMessage);
            }
        });
    }
    static getTotalIncomeExpenseOfWallet(req, res) {
        let walletId = Number(req.params.walletId);
        wallet_services_1.default.getTotalIncomeExpenseOfWallet(walletId)
            .then(result => {
            res.status(200).json(result);
        })
            .catch(err => {
            res.status(500).json(err.message);
        });
    }
    static getWalletsByIncludedIntotal(req, res) {
        //@ts-ignore
        let userId = req.user.id;
        let isIncluded = req.params.isIncluded == "true" ? true : false;
        wallet_services_1.default.getWalletsByIncludedInTotal(userId, isIncluded)
            .then(wallets => {
            res.status(200).json(wallets);
        })
            .catch(err => {
            res.status(500).json(err.message || this.defaultErrorMessage);
        });
    }
    static updateWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet_services_1.default.updateWallet(req.body);
                yield wallet_services_1.default.updateBalance(req.body.walletId);
                res.status(200).json({ message: "Update wallet successfully!" });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static addWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            let userId = req.user.id;
            let name = req.body.name;
            let initialBalance = req.body.initialBalance;
            let includeTotal = req.body.includeTotal;
            try {
                yield wallet_services_1.default.addWallet(userId, name, initialBalance, includeTotal);
                res.status(200).json({ message: "Add wallet successfully" });
            }
            catch (err) {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            }
        });
    }
    static deleteWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let walletId = Number(req.params.walletId);
            wallet_services_1.default.deleteWallet(walletId)
                .then(() => {
                res.status(200).json({ message: "Delete wallet successfully" });
            })
                .catch(err => {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            });
        });
    }
}
exports.default = WalletController;
//# sourceMappingURL=wallet.controller.js.map