import fastify from 'fastify';
import cors from '@fastify/cors';
import { Pool } from 'pg';
import { insertProduct } from './function_helper';
import { ResultPagination, SearchParameter } from './interface';

const server = fastify({ logger: true });
const pool = new Pool({
  connectionString:
    'postgresql://namnx:NncPty9wvloFae0MNPjMow@namnx97-8623.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/products?sslmode=verify-full',
  application_name: '$ docs_simplecrud_node-postgres',
});

server.register(cors, {
  allowedHeaders: '*',
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
});

server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.send(error);
});

server.get('/', async (request, reply) => {
  return 'full stack test';
});

//get all product without pagination
server.get('/products_all', async (request, reply) => {
  const client = await pool.connect();
  const data = await client.query('select * from products');
  return data.rows;
});

//get list or search product
server.get('/products', async (request, reply) => {
  let { pageIndex, pageSize, searchText }: SearchParameter =
    request.query as any;
  pageIndex = pageIndex || 1;
  pageSize = pageSize || 10;
  const offset = (pageIndex - 1) * pageSize;
  const client = await pool.connect();
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
  const resultData = await client.query(queryData);
  const resultTotal = await client.query(queryTotal);
  client.release();
  const result: ResultPagination = {
    total: resultTotal.rows[0].count,
    pageSize,
    pageIndex,
    searchText,
    offset,
    data: resultData.rows,
  };
  return result;
});

//get detail product
server.get('/products/:id', async (request, reply) => {
  const id = (request.params as any).id;
  const client = await pool.connect();
  let queryData = `SELECT * FROM products where id=${id}`;
  const resultData = await client.query(queryData);
  client.release();
  return resultData.rows;
});

//insert demo data
server.get('/insert', async (request, reply) => {
  try {
    return;
    const client = await pool.connect();
    let rowCount = 0;
    rowCount = (await insertProduct(client)) || 0;
    rowCount = rowCount + ((await insertProduct(client)) || 0);
    return `Insert total ${rowCount} records`;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
});

server.listen({ port: 3005 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
