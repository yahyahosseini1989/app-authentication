const { sql, poolPromise } = require('../utilities/mssql_database');

class UsersModel {
  static getUserByEmail = async (email) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("email", sql.NVarChar, email)
    const {recordset} = await request.query('SELECT * FROM users WHERE email = @email;')
    console.log('user info :>> ', recordset[0]);
    return recordset[0]
  }
  
  static insertUser = async (username, email, password, first_name, last_name) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("username", sql.NVarChar, username)
    request.input("email", sql.NVarChar, email)
    request.input("password", sql.NVarChar, password)
    request.input("first_name", sql.NVarChar, first_name)
    request.input("last_name", sql.NVarChar, last_name)
    return await request.query('insert into users (username, email, password, first_name, last_name) values (@username, @email, @password, @first_name, @last_name)')
  }
}

module.exports = UsersModel