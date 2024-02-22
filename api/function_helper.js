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
exports.insertProduct = exports.createRandomProduct = void 0;
const faker_1 = require("@faker-js/faker");
function createRandomProduct() {
    return {
        name: faker_1.fakerVI.commerce.productName(),
        description: faker_1.fakerVI.commerce.productDescription(),
        price: faker_1.fakerVI.commerce.price(),
        category: faker_1.fakerVI.commerce.productMaterial(),
    };
}
exports.createRandomProduct = createRandomProduct;
const insertProduct = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const dataProducts = faker_1.fakerVI.helpers.multiple(createRandomProduct, {
        count: 50000,
    });
    const data = yield client.query('INSERT INTO products (name,description,price,category) ' +
        'SELECT m.* FROM json_populate_recordset(null::products_type, $1) AS m', [JSON.stringify(dataProducts)]);
    return data.rowCount;
});
exports.insertProduct = insertProduct;
