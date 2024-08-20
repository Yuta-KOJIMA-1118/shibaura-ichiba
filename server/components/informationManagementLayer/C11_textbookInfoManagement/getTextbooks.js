const {Textbook} = require('../../../models');


/**
 * @function getTextbooks
 * @description 教科書情報を取得する
 * 
 * @param {String} subject - 科目名 
 * @param {Array} teachers - 教員名の配列
 * @returns {Array} - 教科書情報の配列
 * 
 * @since 2024-06-14
 * @author 小島 佑太
 * @modified 2024-06-19 小島 佑太 - 返り値を変更，then-catchから，async-awaitに変更，検索方法を変更
 */
async function getTextbooks(subject, teachers) {
    let data = [];

    if(subject === '' || teachers.length === 0) {
        return data;
    }

    try {
        const results = await Textbook.findAll({
            where: {
                subjectName: subject,
                professorName: teachers
            }
        });
        for(let r of results) {
            data.push(r);
        }
    } catch (err) {
        console.log(); // 改行
        console.error(err);
        console.log(); // 改行
    }

    if(data.length == 0) {
        // 教科書情報が，subjectとteachersに対応するものが無い場合，subjectだけで検索．これは，同じ授業名でも教員が異なる場合があるため，教員名を優先したが，教員名が無い場合は，科目名だけで検索する．
        try {
            const results = await Textbook.findAll({
                where: {
                    subjectName: subject
                }
            });
            for(let r of results) {
                data.push(r);
            }
        } catch (err) {
            console.log(); // 改行
            console.error(err);
            console.log(); // 改行
        }
    }

    return data;
}

module.exports = { getTextbooks };