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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTransSubCate1675439663189 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableTransSubCate1675439663189 {
    constructor() {
        this.nameTable = 'trans_subcate';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'cate_id', type: 'int', isNullable: false },
                    { name: 'user_id', type: 'int', default: null, isNullable: true },
                    { name: 'name', type: 'varchar(255)', isNullable: false }
                ],
            }));
            let fk_cate_case = new typeorm_1.TableForeignKey({
                columnNames: ['cate_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'trans_cate'
            });
            let fk_user_case = new typeorm_1.TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user'
            });
            let subcate_index = new typeorm_1.TableIndex({
                columnNames: ['cate_id', 'name']
            });
            yield queryRunner.createForeignKey(this.nameTable, fk_cate_case);
            yield queryRunner.createForeignKey(this.nameTable, fk_user_case);
            yield queryRunner.createIndex(this.nameTable, subcate_index);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.nameTable);
        });
    }
}
exports.CreateTableTransSubCate1675439663189 = CreateTableTransSubCate1675439663189;
//# sourceMappingURL=1675439663189-create.transubscate.js.map