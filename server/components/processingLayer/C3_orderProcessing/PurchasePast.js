var express = require('express');
var router = express.Router();
const getPurchasePast = require('../../informationManagementLayer/C8_orderInfoManagement/getPurchasePast');
const getStocksByIds = require('../../informationManagementLayer/C9_inventoryInfoManagement/getStocksByIds');

router.get('/mypagePurchasePast', async function (req, res, next) {
  const { studentId } = req.query; // studentIdを受け取る
  console.log('Received studentId:', studentId); // 確認のためにログ出力
  if (!studentId) {
    res.status(400).json({ error: 'studentId is required' });
    return;
  }
  try {
    const orders = await getPurchasePast(studentId);
    const stockIds = [];
    orders.forEach(order => stockIds.push(order.stockId));
    const result = await getStocksByIds(stockIds);
    console.log("result:")
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching purchase history:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while fetching purchase history.' });
  }
});

module.exports = router;
