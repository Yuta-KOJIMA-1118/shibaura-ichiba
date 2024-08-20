var express = require('express');
const multer = require('multer');
const path = require('path');
var router = express.Router();
const { listing } = require('../../informationManagementLayer/C9_inventoryInfoManagement/listing');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 4), async function (req, res, next) {
    const { studentId, price, description, textbookId, stockName } = req.body;
    let imagePaths = req.files.map(file => `/public/images/${file.filename}`);
    imagePaths = JSON.stringify(imagePaths);

    try {
        await listing(studentId, textbookId, price, description, imagePaths, stockName);
        res.status(200).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

module.exports = router;