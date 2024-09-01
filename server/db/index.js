import pg from 'pg';
const { Pool } = pg;

const pool = new Pool();


//const query = (text, params) => pool.query(text, params);
//export default query;

export const dbQuery = (text, params) => pool.query(text, params);
