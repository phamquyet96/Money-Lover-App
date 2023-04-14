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
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const trans_subcate_model_1 = __importDefault(require("../models/trans.subcate.model"));
const data_source_1 = __importDefault(require("../database/data-source"));
const wallet_services_1 = __importDefault(require("./wallet.services"));
const transsubcate_services_1 = __importDefault(require("./transsubcate.services"));
let transactionRepo = data_source_1.default.getRepository(transaction_model_1.default);
let transSubCateRepo = data_source_1.default.getRepository(trans_subcate_model_1.default);
const [INCOME, EXPENSE] = ["Income", "Expense"];
const [OTHER_INCOME_ID, OTHER_EXPENSE_ID] = [34, 20];
class TransactionServices extends base_services_1.default {
    static getTransactions(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let myDate = '';
            let query = yield transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.id')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.id', 'subCate_id')
                .addSelect('wallet.id', 'wallet_id')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('user.id = :id', { id: userId });
            if (!data.startDate) {
                if (data.date) {
                    if (data.date === '') {
                        myDate = `${data.year}-${data.month}%`;
                    }
                    else {
                        myDate = `${data.year}-${data.month}-${data.date}%`;
                    }
                    query = query.andWhere('trans.date LIKE :date', { date: myDate });
                }
                else {
                    myDate = `${data.year}-${data.month}%`;
                    query = query.andWhere('trans.date LIKE :date', { date: myDate });
                }
            }
            else {
                let start = data.startDate.split('/').reverse().join('-');
                let end = data.endDate.split('/').reverse().join('-');
                query = query.andWhere('trans.date >= :startDate', { startDate: start })
                    .andWhere('trans.date <= :endDate', { endDate: end });
            }
            return query
                .getRawMany()
                .then((trans) => {
                let arr = [];
                let dates = trans.map(tran => { return tran.date.toString(); });
                let uniqueDate = Array.from(new Set(dates));
                for (let i = 0; i < uniqueDate.length; i++) {
                    let obj = {
                        date: uniqueDate[i],
                        sum: 0,
                        transOfDate: []
                    };
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].date.toString() === uniqueDate[i]) {
                            obj.transOfDate.push(trans[j]);
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money;
                            }
                            else {
                                obj.sum -= trans[j].money;
                            }
                        }
                    }
                    arr.push(obj);
                }
                return arr.sort((a, b) => {
                    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                });
            });
        });
    }
    static getTransactionsOfWallet(walletId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let myDate = '';
            let query = yield transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.id')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.id', 'subCate_id')
                .addSelect('wallet.id', 'wallet_id')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('wallet.id = :id', { id: walletId });
            if (!data.startDate) {
                if (data.date) {
                    if (data.date === '') {
                        myDate = `${data.year}-${data.month}%`;
                    }
                    else {
                        myDate = `${data.year}-${data.month}-${data.date}%`;
                    }
                    query = query.andWhere('trans.date LIKE :date', { date: myDate });
                }
                else {
                    myDate = `${data.year}-${data.month}%`;
                    query = query.andWhere('trans.date LIKE :date', { date: myDate });
                }
            }
            else {
                let start = data.startDate.split('/').reverse().join('-');
                let end = data.endDate.split('/').reverse().join('-');
                query = query.andWhere('trans.date >= :startDate', { startDate: start })
                    .andWhere('trans.date <= :endDate', { endDate: end });
            }
            return query
                .getRawMany()
                .then((trans) => {
                let arr = [];
                let dates = trans.map(tran => { return tran.date.toString(); });
                let uniqueDate = Array.from(new Set(dates));
                for (let i = 0; i < uniqueDate.length; i++) {
                    let obj = {
                        date: uniqueDate[i],
                        sum: 0,
                        transOfDate: []
                    };
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].date.toString() === uniqueDate[i]) {
                            obj.transOfDate.push(trans[j]);
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money;
                            }
                            else {
                                obj.sum -= trans[j].money;
                            }
                        }
                    }
                    arr.push(obj);
                }
                return arr.sort((a, b) => {
                    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                });
            });
        });
    }
    static getTransactionsByTypeName(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let myDate = '';
            let query = yield transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.id')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.id', 'subCate_id')
                .addSelect('wallet.id', 'wallet_id')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('user.id = :id', { id: userId });
            if (!data.startDate) {
                if (data.date === '') {
                    myDate = `${data.year}-${data.month}%`;
                }
                else {
                    myDate = `${data.year}-${data.month}-${data.date}%`;
                }
                query = query.andWhere('trans.date LIKE :date', { date: myDate });
            }
            else {
                let start = data.startDate.split('/').reverse().join('-');
                let end = data.endDate.split('/').reverse().join('-');
                query = query.andWhere('trans.date >= :startDate', { startDate: start })
                    .andWhere('trans.date <= :endDate', { endDate: end });
            }
            return query
                .andWhere('type.name = :name', { name: data.typeName })
                .getRawMany()
                .then(trans => {
                let arr = [];
                let names = Array.from(new Set(trans.map(tran => { return tran.subCate_name; })));
                for (let i = 0; i < names.length; i++) {
                    let obj = {
                        subCate_name: names[i],
                        sum: 0,
                        trans: []
                    };
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].subCate_name === names[i]) {
                            obj.trans.push(trans[j]);
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money;
                            }
                            else {
                                obj.sum -= trans[j].money;
                            }
                        }
                    }
                    let newTrans = [];
                    let dates = obj.trans.map(tran => { return tran.date.toString(); });
                    let uniqueDate = Array.from(new Set(dates));
                    for (let a = 0; a < uniqueDate.length; a++) {
                        let newObj = {
                            date: uniqueDate[a],
                            sum: 0,
                            transOfDate: []
                        };
                        for (let b = 0; b < obj.trans.length; b++) {
                            if (obj.trans[b].date.toString() === uniqueDate[a]) {
                                newObj.transOfDate.push(obj.trans[b]);
                                if (obj.trans[b].type_name === 'Income') {
                                    newObj.sum += obj.trans[b].money;
                                }
                                else {
                                    newObj.sum -= obj.trans[b].money;
                                }
                            }
                        }
                        newTrans.push(newObj);
                    }
                    obj.trans = newTrans.sort((a, b) => {
                        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                    });
                    arr.push(obj);
                }
                return arr;
            });
        });
    }
    static getTransactionsByTypeNameOfWallet(walletId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let myDate = '';
            let query = yield transactionRepo.createQueryBuilder('trans')
                .innerJoin('trans.wallet', 'wallet')
                .innerJoin('wallet.user', 'user')
                .innerJoin('trans.subCategory', 'subCategory')
                .innerJoin('subCategory.category', 'category')
                .innerJoin('category.transType', 'type')
                .select('trans.money, trans.date, trans.note, trans.id')
                .addSelect('wallet.name', 'wallet_name')
                .addSelect('subCategory.id', 'subCate_id')
                .addSelect('wallet.id', 'wallet_id')
                .addSelect('subCategory.name', 'subCate_name')
                .addSelect('type.name', 'type_name')
                .where('wallet.id = :id', { id: walletId });
            if (!data.startDate) {
                if (data.date === '') {
                    myDate = `${data.year}-${data.month}%`;
                }
                else {
                    myDate = `${data.year}-${data.month}-${data.date}%`;
                }
                query = query.andWhere('trans.date LIKE :date', { date: myDate });
            }
            else {
                let start = data.startDate.split('/').reverse().join('-');
                let end = data.endDate.split('/').reverse().join('-');
                query = query.andWhere('trans.date >= :startDate', { startDate: start })
                    .andWhere('trans.date <= :endDate', { endDate: end });
            }
            return query
                .andWhere('type.name = :name', { name: data.typeName })
                .getRawMany()
                .then(trans => {
                let arr = [];
                let names = Array.from(new Set(trans.map(tran => { return tran.subCate_name; })));
                for (let i = 0; i < names.length; i++) {
                    let obj = {
                        subCate_name: names[i],
                        sum: 0,
                        trans: []
                    };
                    for (let j = 0; j < trans.length; j++) {
                        if (trans[j].subCate_name === names[i]) {
                            obj.trans.push(trans[j]);
                            if (trans[j].type_name === 'Income') {
                                obj.sum += trans[j].money;
                            }
                            else {
                                obj.sum -= trans[j].money;
                            }
                        }
                    }
                    let newTrans = [];
                    let dates = obj.trans.map(tran => { return tran.date.toString(); });
                    let uniqueDate = Array.from(new Set(dates));
                    for (let a = 0; a < uniqueDate.length; a++) {
                        let newObj = {
                            date: uniqueDate[a],
                            sum: 0,
                            transOfDate: []
                        };
                        for (let b = 0; b < obj.trans.length; b++) {
                            if (obj.trans[b].date.toString() === uniqueDate[a]) {
                                newObj.transOfDate.push(obj.trans[b]);
                                if (obj.trans[b].type_name === 'Income') {
                                    newObj.sum += obj.trans[b].money;
                                }
                                else {
                                    newObj.sum -= obj.trans[b].money;
                                }
                            }
                        }
                        newTrans.push(newObj);
                    }
                    obj.trans = newTrans.sort((a, b) => {
                        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                    });
                    arr.push(obj);
                }
                return arr;
            });
        });
    }
    static deleteTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield transactionRepo.remove(transaction);
        });
    }
    ;
    static getTransactionById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield transactionRepo.createQueryBuilder("transaction")
                .innerJoinAndSelect("transaction.wallet", "wallet")
                .where("transaction.id = :id", { id: transactionId })
                .getOne();
            if (!transaction) {
                throw new Error("Transaction not found");
            }
            return transaction;
        });
    }
    static addTransaction(walletId, subcategoryId, money, date, image, note) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield wallet_services_1.default.getWalletById(walletId);
            let subcategory = yield transsubcate_services_1.default.getSubCateById(subcategoryId);
            let transaction = new transaction_model_1.default();
            transaction.wallet = wallet;
            transaction.subCategory = subcategory;
            transaction.money = money ? Number(money) : null;
            transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
            transaction.image = image;
            transaction.note = note;
            console.log(transaction.date);
            yield transactionRepo.save(transaction);
        });
    }
    static updateTransaction(transactionId, { walletId, subcategoryId, money, date, image, note }) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield this.getTransactionById(transactionId);
            let wallet = yield wallet_services_1.default.getWalletById(walletId);
            let subcategory = yield transsubcate_services_1.default.getSubCateById(subcategoryId);
            transaction.wallet = wallet;
            transaction.subCategory = subcategory;
            transaction.money = money ? +money : null;
            transaction.date = typeof date == 'string' ? date.substring(0, 10) : date;
            transaction.image = image;
            transaction.note = note;
            yield transactionRepo.save(transaction);
        });
    }
    static addTransactionToAdjustBalance(userId, walletId, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield wallet_services_1.default.getWalletById(walletId);
            let subcategoryName = balance > wallet.balance ? "Other Income" : "Other Expense";
            let subcategory = yield transSubCateRepo.findOneBy({
                name: subcategoryName,
                user: {
                    id: userId
                }
            });
            let money = Math.abs(balance - wallet.balance);
            yield this.addTransaction(walletId, subcategory.id, money, new Date(), null, "Adjust Balance");
        });
    }
}
exports.default = TransactionServices;
//# sourceMappingURL=transaction.services.js.map