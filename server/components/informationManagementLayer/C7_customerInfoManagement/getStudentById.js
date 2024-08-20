const {Student} = require('../../../models');

/**
 * @function getStudentById
 * @description 学生情報を学生idで取得する
 * 
 * @param {int} studentId 
 * @return {object | null} - 学生情報，存在しない場合はnull
 * 
 * @since 2024-06-18
 * @author 小島 佑太
 * @modified 2024-06-19 小島 佑太 - then-catchから，async-awaitに変更
*/
async function getStudentById(studentId) {
    try {
        const student = await Student.findByPk(studentId);
        return student;
    } catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
        return null;
    }
}
module.exports = { getStudentById };