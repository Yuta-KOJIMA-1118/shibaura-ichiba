const express = require('express');
const router = express.Router();
const { Stock } = require('../../../models');
const { Order } = require('../../../models');
const { registBuy } = require('../../informationManagementLayer/C9_inventoryInfoManagement/registBuy');
const { registOrder } = require('../../informationManagementLayer/C8_orderInfoManagement/registOrder');

/**
 * @function getItemState
 * @description 渡された在庫IDより在庫状態を確認し、出品中なら在庫状態を変え、注文情報に登録。
 *              出品中でなければfalseの場合、自分で購入した商品か確認のため、Ordersから
 *              stockIdに対応するstudentIdを取得し、商品を閲覧中の学生のstudentIdと一致した
 *              らtrue,そうでなければfalseを返す。
 * 
 * @param {int} stockId - 在庫ID 
 * @param {int} studentId - 学生ID
 * @return {array} response - goToChatPageis - chatPageに遷移可能か
 *                            orderId - 注文ID
 * 
 * @since 2024-06-15
 * @author S.A
 * 
 * @modified 2024-07-02 須藤綾太 - responseでメッセージを返すのではなくtrueかfalseを返すようにした
 * @modified 2024-07-08 須藤綾太 - studentIdをテスト用のマジックナンバーからItemPageから取得するようにした
 * @modified 2024-07-12 須藤綾太 - 変数goToChatPageisに追加
 *                                goToChatPageisがfalseの場合OrdersからstudentIdを取得し、studentIdと一致するか確認する処理を追加
 * @modified 2024-07-15 須藤綾太 - 返り値にorderId追加
 *                                在庫が購入済みの場合,出品者もチャットに遷移できるように変更
 *                                在庫が出品中ならチャットページには遷移できないように処理を追加
 *                                responseに出品状態:stateを追加
 */

router.get('/', async function (req, res) {
    console.log("--> in getItemState");

    const stockId = req.query.stockId;
    const studentId = req.query.studentId;
    let goToChatPageis = false;
    let orderId = null;
    let buyerId = null;
    let sellerId = null;
    let state = null;
    let stock = null;

    try {
        // stockIdに対応する在庫の出品状態を取得
        stock = await Stock.findByPk(stockId);
        state = stock.state;


        // stateが出品中の時、registBuy,registOrder関数を実行
        // stateが出品不可の時、購入者が現在商品を閲覧している学生か確認
        if(state == true) {

            orderId = await registBuy( studentId, stockId ); 
            state = await registOrder( stockId ); 

            goToChatPageis = true;
        } else {

            order = await Order.findOne({
                where: { 
                    stockId: stockId
                }});

            buyerId = order.studentId;
            sellerId = stock.studentId;
            orderId = order.id;

            if(buyerId == studentId) {
                console.log("購入者が閲覧");
                goToChatPageis = true;
            }else if(sellerId == studentId) {
                console.log("出品者が閲覧");
                goToChatPageis = true;
            }
        }

        if(state == true) {
            goToChatPageis = false;
        }

        response = {
            goToChatPageis: goToChatPageis,
            orderId: orderId,
            state: state,
        }

        res.json(response);
    } catch (e) {
        console.error(e);
    }
    console.log("----------------------------------------------");
    console.log("chatPage遷移: ", goToChatPageis);
    console.log("出品状態: ", state);
    console.log("注文Id: ", orderId);
    console.log("購入学生Id: ", buyerId);
    console.log("出品学生Id: ", sellerId);
    console.log("ボタン押下学生Id: ", studentId);
    console.log("response: ", response);
    console.log("-----------------------------------------------");
    console.log("<-- out getItemState");
});
module.exports = router;