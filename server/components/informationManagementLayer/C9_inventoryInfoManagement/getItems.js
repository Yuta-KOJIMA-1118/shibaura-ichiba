const { Stock, Textbook } = require('../../../models');
const { Op } = require('sequelize');

const getItems = async (studentId, searchQuery, subjectName, professorName) => {
    try {
        const conditions = {
            studentId: {
                [Op.ne]: studentId
            },
            state: {
                [Op.ne]: false
            }
        };

        if (searchQuery) {
            conditions.stockName = {
                [Op.like]: `%${searchQuery}%`
            };
        }

        const textbookConditions = {};
        if (subjectName && subjectName.trim() !== '') {
            textbookConditions.subjectName = subjectName;
        }
        if (professorName && professorName.trim() !== '') {
            textbookConditions.professorName = professorName;
        }

        console.log('Conditions:', conditions);
        console.log('Textbook Conditions:', textbookConditions);

        const stocks = await Stock.findAll({
            where: conditions,
            include: [{
                model: Textbook,
                required: true,
                where: textbookConditions
            }]
        });

        console.log('Stocks:', stocks);

        return stocks;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;
    }
};

module.exports = getItems;