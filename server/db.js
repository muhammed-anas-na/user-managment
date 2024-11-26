// db.js
import pkg from 'pg';
const { Pool } = pkg;

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user-managment',
  password: 'Kl08@x555',
  port: 5432,
});

export default pool;
