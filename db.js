import pkg from 'pg'; 
const { Pool } = pkg;  

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

export { pool };
