const express = require('express');
const router = express.Router();
const { getTextbooks } = require('../../informationManagementLayer/C11_textbookInfoManagement/getTextbooks');
const { getTextbooksByIds } = require('../../informationManagementLayer/C11_textbookInfoManagement/getTextbooksByIds');
const { insertTimetable } = require('../../informationManagementLayer/C12_timetableInfoManagement/insertTimetable');
const { getTimetable } = require('../../informationManagementLayer/C12_timetableInfoManagement/getTimetable');

//
// @function getSuggestedTextbooks
// @description ScombからChrome拡張機能でコピーした時間割を受け取り，それに対して教科書をサジェストし，個人の時間割情報をDBに保存する．
//
// @since 2024-06-14
// @author 小島 佑太
//
// @modified 2024-06-19 小島 佑太 - getTextbooks, getTextbooksByIds, getTimetableの返り値が変わったので，それに対応
//
router.post('/', async function(req, res) {   
    const input = req.body.timeTable;
    const line = input.split('\n');
    const studentId = req.body.studentId;
    const textbooks = []; // {textbook: textbook} の配列


    if(studentId == undefined || studentId == null) {
        console.log("studentId is undefined or null");
        return;
    }

    // 科目名, 教員名1, 教員名2, ... , 教員名n
    for (let l of line) {
        if(checkLine(l) === false) {
            continue;
        }

        const data = l.split(', ');
        let subject = data[0];
        const teachers = [];

        if(subject == undefined || subject == null) {
            continue;
        }

        for (let i = 1; i < data.length; i++) {
            data[i] = processInput(data[i]);
            teachers.push(data[i]);
        }

        subject = processInput(subject);

        // 教科書情報を取得
        let tmp = await getTextbooks(subject, teachers);

        for (let t of tmp) {
            textbooks.push(t);
        }
    }

    // 同じ教科書を削除
    deleteSameTextbooks(textbooks);

    // 対応する教科書がある場合，timeTablesテーブルに追加
    for (let textbook of textbooks) {
        const resultInsertTimetable = await insertTimetable(studentId, textbook.getDataValue('id'));
        if (resultInsertTimetable === false) {
            continue;
        }
    }

    // 時間割情報を取得
    const timetable = await getTimetable(studentId);

    const textbookIds = [];
    for (let t of timetable) {
        textbookIds.push(t.getDataValue('textbookId'));
    }

    // 教科書情報を取得
    const textbooks2 = await getTextbooksByIds(textbookIds);

    // フロントエンドに教科書情報を返す
    let response = {data:[]};
    for (let textbook of textbooks2) {
        response.data.push({
            textbookId: textbook.getDataValue('id'),
            subjectName: textbook.getDataValue('subjectName'),
            textbookName: textbook.getDataValue('textbookName')
        });
    }
    res.json(response);
});
module.exports = router;


/**
 * @function deleteSameTextbooks
 * @description textbooksのうち，同じIDを持つものを削除する
 * 
 * @param {ArrayList} textbooks - textbooks.textbook.getDataValue('id')でidが得られる 
 * @return {void}
 * 
 * @since 2024-06-17
 * @author 小島 佑太
*/
function deleteSameTextbooks(textbooks) {
    const seenIds = new Set();
    for (let i = 0; i < textbooks.length; i++) {
        const id = textbooks[i].getDataValue('id');
        if (seenIds.has(id)) {
            textbooks.splice(i, 1);
            i--; // spliceで要素を削除したのでインデックスを調整する
        } else {
            seenIds.add(id);
        }
    }
}

/**
 * @function checkLine
 * @description 日本語，英数字，一般的な記号のみを含む文字列かをチェックする関数
 * 
 * @param {String} input 
 * @returns {boolean} - true: 日本語，英数字，一般的な記号のみを含む，false: それ以外を含む
 * 
 * @since 2024-06-14
 * @author 小島 佑太
*/
function checkLine(input) {
    // 日本語、英数字、および一般的な記号を含む正規表現
    const validPattern = /^[\u3040-\u30FF\u4E00-\u9FFF\uFF00-\uFFEFa-zA-Z0-9 .,!?@#\$%\^&\*\(\)\-_+=<>;:'"~`\[\]{}\\|\/\s\u3000\t]*$/;
    return validPattern.test(input);
}

/**
 * @function processInput
 * @description 与えられた文字列に対して二つの操作をして返す関数．1. すべてのスペース（半角、全角、タブ）を削除する 2. 全角の英数記号を半角にする
 * 
 * @param {String} input 
 * @returns {String} - inputに三つの操作を加えられた文字列
 */
function processInput(input) {
    // 1. すべてのスペース（半角、全角、タブ）を削除する
    let result = input.replace(/[\s\u3000\t]/g, '');

    // 2. 全角の英数記号を半角にする
    result = result.replace(/[\uff01-\uff5e]/g, function(ch) {
        return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
    });

    return result;
}


