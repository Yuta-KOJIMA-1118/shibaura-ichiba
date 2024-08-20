/**
 *@function getPurchasePast
 *@discription 購入履歴を取得する
 *
 *@since 2024-07-02
 *@author S.R
 */

const { Order } = require('../../../models');

const getPurchasePast = async (studentId) => {
    try {
        console.log('Fetching purchase history for studentId', studentId);
        const PurchasePasts = await Order.findAll({
            where: {
                studentId: studentId
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return PurchasePasts;
    } catch (error) {
        throw error;
    }
}

module.exports = getPurchasePast;
