const {Timetable} = require('../../../models');

/**
 * @function getTimetable
 * @description 時間割情報をDBから取得する
 * 
 * @param {int} studentId 
 * @returns {Array} - 時間割情報の配列
 * 
 * @since 2024-06-17
 * @author 小島 佑太
 * @modified 2024-06-19 小島 佑太 - then-catchから，async-awaitに変更, 返り値を変更
 */
async function getTimetable(studentId) {
    let data = [];

    // テーブルから，studentIdに対応する時間割情報を取得
    try {
        const result = await Timetable.findAll({
            where: {
                studentId: studentId
            }
        });

        for(let r of result) {
            data.push(r);
        }
    } catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
    }

    return data;
}

module.exports = { getTimetable };