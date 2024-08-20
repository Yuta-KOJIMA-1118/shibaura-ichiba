const { Order } = require('../../../models');

/**
 * @function registBuy
 * @description 渡された在庫Id、学生Idを紐づけてDBに挿入する
 * 
 * @param {int} studentId - 学生Id
 * @param {int} stockId - 在庫Id
 * @return {int} orderId - 注文Id
 * 
 * @since 2024-06-15
 * @author S.A
 * 
 * @modified 2024-07-15 須藤綾太 orderIdを返すように変更
 */

async function registBuy(studentId, stockId) {
    console.log("---> in registBuy");

    let orderId = null;

    // studentIdとstockIdをテーブルに挿入
    try {
        const order =  await Order.create({
            studentId: studentId,
            stockId: stockId
        });
        console.log("<<Order created successfully>>");

        orderId = order.id;

    } catch (err) {
        console.error("<<Order created failed!!>>", err);
    }

    console.log("----------------------------------------------");
    console.log("注文Id :", orderId);
    console.log("----------------------------------------------");
    console.log("<--- out registBuy");

    return orderId;
}

module.exports = { registBuy };