const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
    const subjectName = req.body.subjectName;

    console.log('subjectName: ' + subjectName);

    res.json({status: 'ok'});
});

module.exports = router;