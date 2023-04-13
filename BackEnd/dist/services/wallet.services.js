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
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
let walletRepo = data_source_1.default.getRepository(wallet_model_1.default);
const [INCOME, EXPENSE] = [1, 2];
class WalletServices extends base_services_1.default {
    static getAllWalletsOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield walletRepo.createQueryBuilder('wallet')
                .innerJoin('wallet.user', 'user')
                .select('wallet.name, wallet.balance, wallet.includeTotal, wallet.active, wallet.id')
                .where('user.id = :id', { id: userId })
                .getRawMany();
        });
    }
    static adjustBalance(walletId, money) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getWalletById(walletId);
            wallet.balance -= money;
            yield walletRepo.save(wallet);
        });
    }
    static updateBalance(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getWalletById(walletId);
            let { totalIncome, totalExpense } = yield this.getTotalIncomeExpenseOfWallet(walletId);
            wallet.balance = wallet.initialBalance + totalIncome - totalExpense;
            yield walletRepo.save(wallet);
        });
    }
    static getWalletById(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield walletRepo.findOneBy({ id: walletId });
            if (!wallet) {
                throw new Error('Wallet not found');
            }
            return wallet;
        });
    }
    static getALlWalletsInfoOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let allWalletsInfo = [];
            let allWallets = yield this.getAllWalletsOfUser(userId);
            for (let i = 0; i < allWallets.length; i++) {
                let walletInfo = yield this.getAllInfoOfWallet(allWallets[i].id);
                allWalletsInfo.push(walletInfo);
            }
            return allWalletsInfo;
        });
    }
    static getAllInfoOfWallet(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getWalletById(walletId);
            let { totalIncome, totalExpense } = yield this.getTotalIncomeExpenseOfWallet(walletId);
            return Object.assign(Object.assign({}, wallet), { inflow: totalIncome, outflow: totalExpense });
        });
    }
    static getTotalIncomeExpenseOfWallet(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalIncomeExpense = yield walletRepo.createQueryBuilder("wallet")
                .innerJoin("wallet.transactions", "transaction")
                .innerJoin("transaction.subCategory", "subCategory")
                .innerJoin("subCategory.category", "category")
                .innerJoin("category.transType", "transType")
                .addSelect("SUM(transaction.money)", "sum")
                .addSelect("transType.id", "transType")
                .addGroupBy("transType.id")
                .where("wallet.id = :walletId", { walletId: walletId })
                .getRawMany();
            let totalIncomeDetail = totalIncomeExpense.filter(item => item.transType == INCOME)[0];
            let totalExpenseDetail = totalIncomeExpense.filter(item => item.transType == EXPENSE)[0];
            let totalIncome = totalIncomeDetail ? Number(totalIncomeDetail.sum) : 0;
            let totalExpense = totalExpenseDetail ? Number(totalExpenseDetail.sum) : 0;
            return { totalIncome: totalIncome, totalExpense: totalExpense };
        });
    }
    static getTotalBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let { totalBalance } = yield walletRepo.createQueryBuilder("wallet")
                .innerJoin("wallet.user", "user")
                .addSelect("SUM(wallet.balance)", "totalBalance")
                .addGroupBy("user.id")
                .where("user.id = :id", { id: userId })
                .getRawOne();
            return totalBalance;
        });
    }
    static getWalletsByIncludedInTotal(userId, isIncluded) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallets = yield walletRepo.findBy({
                includeTotal: isIncluded,
                user: {
                    id: userId
                }
            });
            return wallets;
        });
    }
    static updateWallet({ walletId, name, initialBalance, includeTotal, active }) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield this.getWalletById(walletId);
            wallet.name = name;
            wallet.initialBalance = initialBalance;
            wallet.includeTotal = includeTotal;
            wallet.active = active;
            yield walletRepo.save(wallet);
        });
    }
    static addWallet(user, name, initial_balance, includeTotal) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = new wallet_model_1.default();
            wallet.user = user;
            wallet.name = name;
            wallet.balance = initial_balance;
            wallet.initialBalance = initial_balance;
            wallet.includeTotal = includeTotal;
            yield walletRepo.save(wallet);
            return wallet;
        });
    }
    static deleteWallet(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield walletRepo.findOneBy({ id: walletId });
            yield walletRepo.remove(wallet);
        });
    }
}
exports.default = WalletServices;
//# sourceMappingURL=wallet.services.js.map