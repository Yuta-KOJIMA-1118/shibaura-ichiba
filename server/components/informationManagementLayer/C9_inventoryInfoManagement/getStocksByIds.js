const {Stock} = require('../../../models');

/**
 * @function getStockByIds
 * @description 教科書情報を教科書IDで取得する
 * 
 * @param {int} ids - stockIdの配列
 * @returns {Array} - stock情報の配列
 * 
 * @since 2024-07-16
 * @author 小島 佑太
 */
async function getStockByIds(ids) {
    let data = [];

    // idの配列が空の場合
    if(ids == undefined || ids == null || ids.length === 0) {
        return data;
    }

    try {
        const result = await Stock.findAll({
            where: {
                id: ids
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

module.exports = getStockByIds;