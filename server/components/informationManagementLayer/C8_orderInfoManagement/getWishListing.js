/**
 *@function getWishListing
 *@discription 購入希望を取得する
 *
 *@since 2024-07-02
 *@author S.R
 */

const { Stock } = require('../../../models');

const getWishListing = async (studentId) => {
    try {
        const WishListings = await Stock.findAll({
            where: {
                studentId : studentId,
                state : true
            }
        })
        return WishListings;        
    } catch (error) {
        throw error;
    }   
}    

module.exports = getWishListing;