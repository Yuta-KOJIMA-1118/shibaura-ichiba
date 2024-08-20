const { Stock } = require('../../../models');

/**
 * @function registOrder
 * @description 渡された在庫Idの出品状態を購入不可(false)にする関数
 * 
 * @param {int} stockId - 在庫ID 
 * 
 * @since 2024-06-15
 * @author S.A
 */

async function registOrder( stockId ) {
    console.log("---> in registOrder");
    let state = null;

    // テーブルの, stockIdに対応する在庫のstateをfalseに変更
    try {
        Stock.update(
            { state: false },
            { where: { id: stockId } }
        );
        state = false;
        console.log("<<Stock update successfully>>")
    } catch (err) {
        console.error("<<Stock update failed!!>>", err);
    }

    console.log("<--- out registOrder");

    return state;
}

module.exports = { registOrder };