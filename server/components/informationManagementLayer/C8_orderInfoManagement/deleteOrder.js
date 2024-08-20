const {Order} = require('../../../models');

/**
 * @function deleteOrder
 * @description 指定された在庫IDのオーダー情報を削除する
 * 
 * @param {int} stockId - 在庫ID
 * @returns {orderId} - 削除されたオーダーのID
 * 
 * @since 2024-07-15
 * @author 小島 佑太
 */
async function deleteOrder(stockId) {
    try {
        const order = await Order.destroy({
            where: {
                stockId: stockId
            }
        })
        return order.id;
    }
    catch (error) {
        console.error(error)
        return null;
    }
}

module.exports = { deleteOrder };