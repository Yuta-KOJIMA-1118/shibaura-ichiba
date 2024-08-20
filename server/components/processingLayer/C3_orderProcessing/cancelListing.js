var express = require('express');
var router = express.Router();

const { deleteChat } = require('../../informationManagementLayer/C10_chatInfoManagement/deleteChat');
const { deleteOrder } = require('../../informationManagementLayer/C8_orderInfoManagement/deleteOrder');
const { deleteStock } = require('../../informationManagementLayer/C8_orderInfoManagement/deleteStock');

router.get('/', async function (req, res, next) {
    const stockId = req.query.stockId;
    const orderId = await deleteOrder(stockId);
    if(orderId != null) {
        await deleteChat(orderId);
    }
    await deleteStock(stockId);
});
module.exports = router;