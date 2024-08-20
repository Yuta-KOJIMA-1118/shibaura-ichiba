const { Order, Stock } = require('../../../models');

const cancelPurchase = async (orderId) => {
    try {
        const order = await Order.findOne({ where: { id: orderId } });

        if (!order) {
            console.log('Already deleted')
            return true;
        }

        await Stock.update(
            { state: 1 },
            { where: { id: order.stockId } }
        );

        await order.destroy();

        return true;
    } catch (error) {
        console.error('Error cancel purchase:', error);
        throw error;
    }
};

module.exports = cancelPurchase;