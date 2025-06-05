require('dotenv').config()
const sql = require('mssql')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: 'SQLEXPRESS'
  }
}

const poolPromise = new sql.ConnectionPool(config).connect().then(pool => {
  console.log('connected to pool')
  return pool
}).catch(err => console.log('error to connect :>> ', err))

module.exports = {
  poolPromise,
  sql
}