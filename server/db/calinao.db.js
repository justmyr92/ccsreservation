const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "54.179.35.184",
    database: "calinao_db",
    password: "dyasmir",
    port: 5432,
});

module.exports = pool;
