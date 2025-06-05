const pool = require('../utilities/mysql_database');

class CoursesModel {
  static getCourses = async () => {
    const [result] = await pool.query('select * from courses')
    return result || null
  }

  static getCourse = async (Id) => {
    const [result] = await pool.query(`select * from courses where Id=? `, [Id])
    return result[0] || null
  }

  static insertCourse = async (Title) => {
    const [result] = await pool.query(`insert into courses (Title) values (?)`, [Title])
    return result.insertId // await getCourse(result.insertId)
  }

  static updateCourse = async (Id, Title) => {
    console.log('Id, Title :>> ', Id, Title);
    const [result] = await pool.query(`update courses set Title=? where Id=?`, [Title, Id])
    console.log('result :>> ', result);
    return result // await getCourse(Id)
  }

  static deleteCourse = async (Id) => {
    const result = await pool.query(`delete from courses where Id=? `, [Id])
    console.log('delete result :>> ', result);
    return Id // await getCourses()
  }
}

module.exports = CoursesModel