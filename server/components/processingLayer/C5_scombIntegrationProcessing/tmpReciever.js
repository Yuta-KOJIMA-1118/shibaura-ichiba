const express = require('express');
const router = express.Router();

// @author 小島 佑太，デバッグ用

router.post('/', async function(req, res) {
    const subjectName = req.body.subjectName;

    console.log('subjectName: ' + subjectName);

    res.json({status: 'ok'});
});

module.exports = router;