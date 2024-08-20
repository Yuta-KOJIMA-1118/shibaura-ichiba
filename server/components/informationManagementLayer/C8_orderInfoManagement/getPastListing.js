/**
 *@function getPastListing
 *@discription 出品履歴を取得する
 *
 *@since 2024-07-02
 *@author 下地涼太
 */

const {Stock} = require('../../../models');

const getPastListing = async(studentID) => {
    try {
        const PastListings = await Stock.findAll({
            where: {
                studentId : studentID,
                state : false
            }
        })
        return PastListings;
    } catch (error) {
        throw error;
    }
}

module.exports = getPastListing;