const { sql, poolPromise } = require('../utilities/mssql_database');

class CoursesModel {
  static getCourses = async () => {
    const pool = await poolPromise
    const request = pool.request()
    const { recordset } = await request.query('select * from courses')
    console.log('getCourses result :>> ', recordset);
    return recordset
  }

  static getCourse = async (id) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("Id", sql.Int, id)
    const { recordset } = await request.query('select * from courses where Id = @Id')
    console.log('getCourse result :>> ', recordset);
    return recordset
  }

  static insertCourse = async (title) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("Title", sql.NVarChar, title)
    const result = await request.query('insert into courses (title) values (@Title)')
    console.log('insertCourse result :>> ', result);
    return result
  }

  static updateCourse = async (id, title) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("Id", sql.Int, id)
    request.input("Title", sql.NVarChar, title)
    const result = await request.query('update courses set Title = @Title where Id = @Id')
    console.log('updateCourse result :>> ', result);
    return result
  }

  static deleteCourse = async (id) => {
    const pool = await poolPromise
    const request = pool.request()
    request.input("Id", sql.Int, id)
    const result = await request.query('delete * from courses where Id = @Id')
    console.log('deleteCourse result :>> ', result);
    return   
  }
}

module.exports = CoursesModel