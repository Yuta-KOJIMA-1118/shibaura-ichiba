const express = require('express');
const router = express.Router();

const { insertChatMessage } = require('../../informationManagementLayer/C10_chatInfoManagement/insertChatMessage');
const { loadChatMessages } = require('./loadChatMessages');

router.get('/', async function(req, res) {
    const action = req.query.action;
    

    if(action == 'insert') {
        const senderStudentId = 1;
        const orderId = 1;
        const result = await insertChatMessage(senderStudentId, orderId, 'test');
        if(result === false) {
            console.log('insertChatMessages failed');
            return;
        }
    }
    // action == 'load'
    else {
        const result = await loadChatMessages(1);

        res.json(result);
        return;
    }
});

module.exports = router;

