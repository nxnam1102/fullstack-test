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
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const pg_1 = require("pg");
const function_helper_1 = require("./function_helper");
const server = (0, fastify_1.default)({ logger: true });
const pool = new pg_1.Pool({
    connectionString: 'postgresql://namnx:NncPty9wvloFae0MNPjMow@namnx97-8623.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/products?sslmode=verify-full',
    application_name: '$ docs_simplecrud_node-postgres',
});
server.register(cors_1.default, {
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
});
server.setErrorHandler((error, request, reply) => {
    server.log.error(error);
    reply.send(error);
});
server.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return 'full stack test';
}));
//get all product without pagination
server.get('/products_all', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    const data = yield client.query('select * from products');
    return data.rows;
}));
//get list or search product
server.get('/products', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let { pageIndex, pageSize, searchText } = request.query;
    pageIndex = pageIndex || 1;
    pageSize = pageSize || 10;
    const offset = (pageIndex - 1) * pageSize;
    const client = yield pool.connect();
    let queryData = `SELECT * FROM products `;
    let queryTotal = 'select count(*) from products ';
    if (searchText) {
        const whereQuery = `where lower(name) like '%${searchText.toLowerCase()}%' or lower(category) like '%${searchText.toLowerCase()}%' `;
        queryTotal += whereQuery;
        queryData += whereQuery;
    }
    const paginationQuery = ` GROUP BY id ORDER BY id ASC
  LIMIT ${pageSize} OFFSET ${offset}`;
    queryData += paginationQuery;
    const resultData = yield client.query(queryData);
    const resultTotal = yield client.query(queryTotal);
    client.release();
    const result = {
        total: resultTotal.rows[0].count,
        pageSize,
        pageIndex,
        searchText,
        offset,
        data: resultData.rows,
    };
    return result;
}));
//get detail product
server.get('/products/:id', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const client = yield pool.connect();
    let queryData = `SELECT * FROM products where id=${id}`;
    const resultData = yield client.query(queryData);
    client.release();
    return resultData.rows;
}));
//insert demo data
server.get('/insert', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return;
        const client = yield pool.connect();
        let rowCount = 0;
        rowCount = (yield (0, function_helper_1.insertProduct)(client)) || 0;
        rowCount = rowCount + ((yield (0, function_helper_1.insertProduct)(client)) || 0);
        return `Insert total ${rowCount} records`;
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
}));
server.listen({ port: 3005 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
