const {Order} = require('../../../models');

/**
 * @function isExistOrder
 * @description 注文情報が存在するかどうかを確認する
 * 
 * @param {int} orderId
 * @returns {boolean} - 注文情報が存在するかどうか
 * 
 * @since 2024-07-17
 * @author 小島 佑太
 */
async function isExistOrder(orderId) {
    // 注文IDが無い場合
    if(orderId == undefined || orderId == null) {
        return false;
    }

    try {
        const order = await Order.findByPk(orderId);
        if(order != null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
        return false;
    }
}

module.exports = { isExistOrder };