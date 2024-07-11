const sql = require('mssql');
const { log } = require('../utils/Logger');
const dbConfig = require('../../config.json').database;

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    log('Connected to MSSQL', 'INFO', 'DBContext');
    return pool;
  })
  .catch(err => console.error('Database connection failed:', err));

module.exports = {
  sql,
  poolPromise,
};
