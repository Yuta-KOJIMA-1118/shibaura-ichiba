var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
const cancelPurchase = require('../../informationManagementLayer/C8_orderInfoManagement/cancelPurchase');
const getListing = require('../../informationManagementLayer/C8_orderInfoManagement/getListing');

router.delete('/', async function (req, res, next) {
    const { orderId } = req.query;

    try {
        const order = await getListing(orderId);
        if (!order) {
            return res.json({ success: true, message: 'Already deleted' });
        }

        // 購入がキャンセルになっても画像は消さない（再度出品されるため）todo:画像はいつ消すの？

        // picturePaths = JSON.parse(order.picturePath);
        // if (picturePaths && picturePaths.length > 0) {
        //     picturePaths.forEach((filePath) => {
        //         const fullPath = path.join(__dirname, '../../..', filePath);
        //         console.log(fullPath)
        //         fs.unlink(fullPath, (err) => {
        //             if (err) {
        //                 console.error(`Failed to delete image at ${fullPath}:`, err);
        //             } else {
        //                 console.log(`Deleted image at ${fullPath}`);
        //             }
        //         });
        //     });
        // }

        const result = await cancelPurchase(orderId);
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error cancel purchase:', error);
        next(error);
    }
});

module.exports = router;
