const { Stock } = require('../../../models');

const getListing = async (orderId) => {
  try {
    const listing = await Stock.findByPk(orderId);
    return listing;
  } catch (error) {
    throw error;
  }
};

module.exports = getListing;