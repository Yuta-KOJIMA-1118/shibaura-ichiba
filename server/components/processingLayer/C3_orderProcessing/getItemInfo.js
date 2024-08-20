const express = require('express');
const router = express.Router();
var path = require('path');
const { Stock } = require('../../../models');
const { Textbook } = require('../../../models');
const { Student } = require('../../../models');
const { Order } = require('../../../models');

/**
 * @function getItemInfo
 * @description 渡された在庫IDより商品情報を取得しitemDataとして返す.
 * 
 * @param {int} orderId - 在庫ID 
 * @param {array} response - 商品画面に必要な情報が入った配列
 * 
 * @since 2024-06-15
 * @author S.A
 * 
 * @modified 2024-07-13 須藤綾太 responseにpicturePath,stockNameを追加
 * @modified 2024-07-14 須藤綾太 responseにStudentテーブルから出品者の名前:nameを追加
 */

router.get('/', async function (req, res) {
    console.log("--> in getItemInfo");
    const stockId = req.query.stockId;
    let state = null;
    let response = [];
    let buyerId = null;
    let sellerId = null;

    // Stock,Textbookテーブルから情報を取得
    try {
        const itemData1 = await Stock.findByPk(stockId);
        const textbookId = itemData1.textbookId;
        const studentId = itemData1.studentId;
        const itemData2 = await Textbook.findByPk(textbookId);
        const itemData3 = await Student.findByPk(studentId);
        
        state = itemData1.state;

        if(state == false) {
            itemData4 = await Order.findOne({
                where: { 
                    stockId: stockId
                }});

            buyerId = itemData4.studentId;
        }

        const picturePaths = JSON.parse(itemData1.picturePath);

        response = {
            price: itemData1.price,
            explanation: itemData1.explanation,
            subjectName: itemData2.subjectName,
            professorName: itemData2.professorName,
            picturePaths: picturePaths,
            stockName: itemData1.stockName,
            name: itemData3.name,
            state: state,
            buyerId: buyerId,
            sellerId: itemData1.studentId,
        }

        res.json(response);
    } catch (e) {
        console.error(e);
    }

    console.log("----------------------------------------------");
    console.log("response: ",response);
    console.log("----------------------------------------------");
    console.log("<-- out getItemInfo");
});

router.get('/images', async function (req, res) {
    console.log("--> in getItemInfo 2");

    const filename = req.query.filename;
    const fullPath = path.join(__dirname, '../../..', filename);
    res.sendFile(fullPath);

    console.log("<-- out getItemInfo 2");
});

module.exports = router;