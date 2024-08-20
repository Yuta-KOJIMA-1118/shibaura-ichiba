const { Chat } = require('../../../models');

/**
 * @function getChatMessages
 * @description チャットメッセージを取得する
 * 
 * @param {int} orderId - 注文ID
 * @returns {Array} - chatメッセージの配列
 * 
 * @since 2024-06-18
 * @author 小島 佑太
 * 
 * @modified 2024-06-19 小島 佑太 - 返り値を変更，then-catchから，async-awaitに変更
 */
async function getChatMessages(orderId) {
    let data = [];

    try {
        const result = await Chat.findAll({
            where: {
                orderId: orderId
            },
            order: [['createdAt', 'ASC']] // メッセージを古い順に取得
        });
        for (let r of result) {
            data.push(r);
        }
    } catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
    }
    return data;
}
module.exports = { getChatMessages };