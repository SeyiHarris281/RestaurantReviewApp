import pg from 'pg';
const { Pool } = pg;

// Note: pg dependency knows to look for database connection credentials in the .env file so no need to explicitly declare these when creating the pool
const pool = new Pool();


//const query = (text, params) => pool.query(text, params);
//export default query;

export const dbQuery = (text, params) => pool.query(text, params);
