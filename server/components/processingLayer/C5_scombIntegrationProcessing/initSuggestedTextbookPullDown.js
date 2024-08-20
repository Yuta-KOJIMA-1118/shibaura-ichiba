const express = require('express');
const router = express.Router();

const { getTimetable } = require('../../informationManagementLayer/C12_timetableInfoManagement/getTimetable');
const { getTextbooksByIds } = require('../../informationManagementLayer/C11_textbookInfoManagement/getTextbooksByIds');

//
// @function getSuggestedTextbooks
// @description SuggestedTextbookPullDownを，もとからあるデータで初期化する．
//
// @since 2024-06-17
// @auther 小島 佑太
//
// @modified 2024-06-19 小島 佑太 - getTimetable, getTextbooksByIdsの返り値が変わったので，それに対応
//
router.post('/', async function(req, res) {    
    // 時間割情報を取得
    const studentId = req.body.studentId;
    console.log("studentId:")
    console.log(studentId)
    
    if(studentId == undefined || studentId == null) {
        console.log("studentId is undefined or null")
        return;
    }

    const timetableData = await getTimetable(studentId);
    const textbookIds = [];
    for(let t of timetableData) {
        textbookIds.push(t.getDataValue('textbookId'));
    }

    // 教科書情報を取得
    const textbooks = await getTextbooksByIds(textbookIds);

    const response = {data:[]};
    for (let textbook of textbooks) {
        response.data.push({
            textbookId: textbook.getDataValue('id'),
            subjectName: textbook.getDataValue('subjectName'),
            textbookName: textbook.getDataValue('textbookName')
        });
    }
    res.json(response);
});

module.exports = router;