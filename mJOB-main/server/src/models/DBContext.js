const sql = require('mssql');
const configF = require('../../config.json');

const poolPromise = new sql.ConnectionPool(configF.database)
  .connect()
  .then(pool => {
    return pool;
  })
  .catch(err => console.log(err));

module.exports = {
  sql, poolPromise
};