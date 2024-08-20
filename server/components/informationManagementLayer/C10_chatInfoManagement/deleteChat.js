const {Chat} = require('../../../models');

/**
 * @function deleteChat
 * @description 指定されたオーダーIDのチャット情報を削除する
 * 
 * @param {int} orderId - オーダーID
 * @returns {void}
 * 
 * @since 2024-07-15
 * @author 小島 佑太
 */
async function deleteChat(orderId) {
    try {
        await Chat.destroy({
            where: {
                orderId: orderId
            }
        })
    }
    catch (error) {
        console.error(error)
    }
}

module.exports = { deleteChat };