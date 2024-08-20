const {Stock} = require('../../../models');
var fs = require('fs');
var path = require('path');

/**
 * @function deleteStock
 * @description 指定された在庫IDの在庫情報を削除する
 * 
 * @param {int} stockId - 在庫ID
 * @returns {void}
 * 
 * @since 2024-07-15
 * @author 小島 佑太
 */
async function deleteStock(stockId) {
    try {
        //stockIdでstockを検索
        const stock = await Stock.findByPk(stockId);
        const rawPicturePath = stock.picturePath;
        await Stock.destroy({
            where: {
                id: stockId
            }
        })

        console.log("rawPicturePath: ", rawPicturePath);

        const picturePaths = JSON.parse(rawPicturePath);
        if (picturePaths && picturePaths.length > 0) {
            picturePaths.forEach((filePath) => {
                const fullPath = path.join(__dirname, '../../..', filePath);
                console.log(fullPath)
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image at ${fullPath}:`, err);
                    } else {
                        console.log(`Deleted image at ${fullPath}`);
                    }
                });
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { deleteStock };