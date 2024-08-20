const {Textbook} = require('../../../models');

/**
 * @function getTextbooksByIds
 * @description 教科書情報を教科書IDで取得する
 * 
 * @param {int} textbookIds - 教科書IDの配列
 * @returns {Array} - 教科書情報の配列
 * 
 * @since 2024-06-14
 * @author 小島 佑太
 * @modified 2024-06-19 小島 佑太 - 返り値を変更，then-catchから，async-awaitに変更
 */
async function getTextbooksByIds(textbookIds) {
    let data = [];

    // 教科書IDの配列が空の場合
    if(textbookIds == undefined || textbookIds == null) {
        return data;
    }

    if(textbookIds.length === 0) {
        return data;
    }

    try {
        const result = await Textbook.findAll({
            where: {
                id: textbookIds
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

module.exports = { getTextbooksByIds };