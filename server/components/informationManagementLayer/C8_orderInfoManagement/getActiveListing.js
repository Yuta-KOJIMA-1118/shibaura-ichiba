/**
 *@function getActiveListing
 *@discription 出品中の商品を取得する
 *
 *@since 2024-07-02
 *@author S.R
 */

const { Stock } = require('../../../models');

const getActiveListing = async (studentId) => {
  try {
    const ActiveListings = await Stock.findAll({
      where: {
        studentId: studentId,
        state: true
      }
    })
    return ActiveListings;
  } catch (error) {
    throw error;
  }
};

module.exports = getActiveListing;
