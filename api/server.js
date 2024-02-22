// Import the framework and instantiate it
import Fastify from 'fastify';
import PG from 'pg';

const { Pool } = PG;
const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

fastify.get('/test', async function handler(request, reply) {
  const pool = new Pool({
    connectionString:
      'postgresql://namnx:NncPty9wvloFae0MNPjMow@namnx97-8623.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/products?sslmode=verify-full',
    application_name: '$ docs_simplecrud_node-postgres',
  });
  const client = await pool.connect();
  const data = await client.query('select * from products');
  return data.rows;
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
