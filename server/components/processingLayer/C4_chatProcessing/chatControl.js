/*
* @description chatPage受け取ったチャット情報をデータベースに登録(C10を経由），データベースからチャット情報取得を行いchatPageに返す
* 
* @since 2024-06-10
* @author N.N
*/

const express = require('express');
const router = express.Router();

const { insertChatMessage } = require('../../informationManagementLayer/C10_chatInfoManagement/insertChatMessage');
const { loadChatMessages } = require('./loadChatMessages');
const { isExistOrder } = require('../../informationManagementLayer/C8_orderInfoManagement/isExistOrder');

router.get('/', async function (req, res) {
    const action = req.query.action;
    const prevLength = parseInt(req.query.prevLength) || 0;
    const orderId = req.query.orderId;
    const loginStudentId = req.query.senderStudentId;
    if(await isExistOrder(orderId) === false) {
        console.log('Order does not exist');
        res.send(false);
        return;
    }

    if (action == 'insert') {
        const messageText = req.query.text; // クエリパラメータからメッセージを取得
        const result = await insertChatMessage(loginStudentId, orderId, messageText);
        if (result === false) {
            console.log('insertChatMessages failed');
            return;
        }
        res.send('Message inserted successfully');
    }
    // action == 'load'
    else {
        const result = await loadChatMessages(orderId);
        //todo メッセージの送信者が自分かどうか判別する処理追加
        let showdata = [];
        for (let r of result.slice(prevLength)) {
            let mine = false;
            if (r.senderStudentId == loginStudentId) { mine = true; }
            else { mine = false; }
            r.time.hour = r.time.hour + 9;
            if (r.time.hour >= 24) {
                r.time.hour = r.time.hour - 24;
                r.time.day = r.time.day + 1;
            }
            showdata.push({
                name: r.name,
                time: r.time.month.toString() + "/" + r.time.day.toString() + ' ' + r.time.hour.toString() + ':' + r.time.minute.toString() + '  ',
                message: r.message,
                mine: mine,//送信者が自分かどうか判別
                StudentId: r.senderStudentId,
                login: loginStudentId
            })
        }
        res.json(showdata);
        return;
    }
});

module.exports = router;
