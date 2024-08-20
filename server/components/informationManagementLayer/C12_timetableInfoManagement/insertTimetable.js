const {Timetable} = require('../../../models');

/**
 * @function insertTimetable
 * @description 時間割情報をDBに挿入する
 * 
 * @param {int} studentId 
 * @param {int} textbookId 
 * @param {int} period 
 * @param {int} weekday 
 * @returns {boolean} - 成功したかどうか 
 * 
 * @since 2024-06-14
 * @author 小島 佑太
 * 
 * @modified 2024-06-19 小島 佑太 - then-catchから，async-awaitに変更
 */
async function insertTimetable(studentId, textbookId) {
    let isSucceeded = true;
    try {
        await Timetable.findOrCreate({
            where: {
                studentId: studentId,
                textbookId: textbookId,
            },
            defaults: {
                studentId: studentId,
                textbookId: textbookId,
            }
        });
    } catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
        isSucceeded = false;
    }


    return isSucceeded;
}

module.exports = { insertTimetable };