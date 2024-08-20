var express = require('express');
var router = express.Router();
const getWishListing = require('../../informationManagementLayer/C8_orderInfoManagement/getWishListing');

router.get('/mypageWish',async function (req, res, next) {
    const {studentId} = req.query;
    try {
        const result = await getWishListing(studentId);
        res.json(result);
    } catch (error) {
        next(error);
    }
})

module.exports = router;