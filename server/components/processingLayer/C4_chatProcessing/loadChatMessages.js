const { getChatMessages } = require('../../informationManagementLayer/C10_chatInfoManagement/getChatMessages');
const { getStudentById } = require('../../informationManagementLayer/C7_customerInfoManagement/getStudentById');

/**
 * @function loadChatMessages
 * @description チャットメッセージを取得する
 * 
 * @param {int} orderId 
 * @returns {Array} - [{senderStudentName: String, time: {year: int, month: int, day: int, hour: int, minute: int, second: int}, message: String}] timeの要素はint型なことに注意．文字列ではない．
 * 
 * @since 2024-06-18
 * @author 小島 佑太
 * 
 * @modified 2024-06-19 小島 佑太 - getChatMessagesの返り値が変更されたため，それに合わせて変更
 */
async function loadChatMessages(orderId) {
    // チャットメッセージを取得
    const chat = await getChatMessages(orderId);

    let ret = [];
    for(let c of chat) {
        // 送信者の名前を取得
        const senderStudentName = await getStudentById(c.getDataValue('senderStudentId')).then(result => {
            if(result == null) {
                return '';
            }
            return result.getDataValue('name');
        });
        const time = c.getDataValue('createdAt');
        const timeObj = genTimeObj(time);
        ret.push({
            name: senderStudentName,
            time: timeObj,
            message: c.getDataValue('content'),
            senderStudentId: c.getDataValue('senderStudentId')
        })
    }

    return ret;
}
module.exports = { loadChatMessages };


/**
 * @function genTimeObj
 * @description 時刻をオブジェクトに変換する
 * 
 * @param {timestamp} time 
 * @returns {object} - {year: int, month: int, day: int, hour: int, minute: int, second: int}
 * 
 * @since 2024-06-18
 * @author 小島 佑太
 */
function genTimeObj(time) {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const ret = {year: year, month: month, day: day, hour: hour, minute: minute, second: second};
    //console.log(ret);
    return ret;
}