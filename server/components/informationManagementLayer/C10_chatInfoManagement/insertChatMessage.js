const {Chat} = require('../../../models');

/**
 * @function insertChatMessage
 * @description チャットメッセージを挿入する
 * 
 * @param {int} senderStudentId
 * @param {int} orderId
 * @param {String} message
 * @returns {boolean} - 成功したかどうか
 * 
 * @since 2024-06-18
 * @author 小島 佑太
 * @modified 2024-06-19 小島 佑太 - then-catchから，async-awaitに変更
 */
async function insertChatMessage(senderStudentId, orderId, message) {
    // チャットメッセージを挿入
    let isSucceeded = true;
    try {
        Chat.create({
            senderStudentId: senderStudentId,
            orderId: orderId,
            content: message
        });
        isSucceeded = true;
    } catch (err) {
        isSucceeded = false;
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
    }

    return isSucceeded;
}

module.exports = { insertChatMessage };