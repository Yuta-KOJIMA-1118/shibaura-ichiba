const { Student } = require('../../../models');

async function manageSignup(name, password, omiya, toyosu) {
    try {
        const result = await Student.findOne({
            where: {
                name: name
            }
        });
        if (result == null) {
            await Student.create({
                name: name,
                password: password,
                omiya: omiya,
                toyosu: toyosu
            });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log();
        console.error(error);
        console.log();
        return false;
    }
}

module.exports = { manageSignup };
