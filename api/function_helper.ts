import { fakerVI } from '@faker-js/faker';
import { PoolClient } from 'pg';

export function createRandomProduct() {
  return {
    name: fakerVI.commerce.productName(),
    description: fakerVI.commerce.productDescription(),
    price: fakerVI.commerce.price(),
    category: fakerVI.commerce.productMaterial(),
  };
}
export const insertProduct = async (client: PoolClient) => {
  const dataProducts = fakerVI.helpers.multiple(createRandomProduct, {
    count: 50000,
  });
  const data = await client.query(
    'INSERT INTO products (name,description,price,category) ' +
      'SELECT m.* FROM json_populate_recordset(null::products_type, $1) AS m',
    [JSON.stringify(dataProducts)]
  );
  return data.rowCount;
};
