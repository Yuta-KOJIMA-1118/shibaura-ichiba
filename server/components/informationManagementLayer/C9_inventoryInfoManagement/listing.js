const { Stock } = require('../../../models');

async function listing(studentId, textbookId, price, description, imagePaths, stockName) {
    try {
        await Stock.create({
            studentId: studentId,
            textbookId: textbookId,
            price: price,
            state: true,
            explanation: description,
            picturePath: imagePaths,
            stockName: stockName
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { listing };