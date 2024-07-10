const sql = require('mssql');

const dbConfig = {
  user: 'sa',
  password: '123',
  server: 'localhost',
  database: 'mJob',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.error('Database connection failed:', err));

module.exports = {
  sql,
  poolPromise,
};
