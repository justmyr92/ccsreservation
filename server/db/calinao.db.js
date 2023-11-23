const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "calinao_db",
  password: "ccs123",
  port: 5432,
});

module.exports = pool;
