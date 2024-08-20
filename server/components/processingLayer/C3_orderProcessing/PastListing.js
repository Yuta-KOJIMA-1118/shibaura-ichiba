var express = require('express');
var router = express.Router();
const getPastListing = require('../../informationManagementLayer/C8_orderInfoManagement/getPastListing');

router.get('/mypagePast', async function (req, res, next) {
    const {studentId} = req.query;
    try {
        const result = await getPastListing(studentId);
        res.json(result);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
