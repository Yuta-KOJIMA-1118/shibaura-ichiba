var express = require('express');
var router = express.Router();
const getActiveListing = require('../../informationManagementLayer/C8_orderInfoManagement/getActiveListing');
const getPastListing = require('../../informationManagementLayer/C8_orderInfoManagement/getPastListing');


// 小島が，ActiveListingとPastListingを統合
router.get('/mypageOrder', async function (req, res, next) {
    const { studentId } = req.query;
    try {
        const result_active = await getActiveListing(studentId);
        const result_past = await getPastListing(studentId);

        const result = {
            active: result_active,
            past: result_past
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
