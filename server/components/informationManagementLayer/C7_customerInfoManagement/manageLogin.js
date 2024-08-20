const { Student } = require('../../../models');

async function manageLogin(name, password) {
    try {
        const student = await Student.findOne({
            where: {
                name: name,
                password: password
            }
        });
        if (student) {
            return student.id;
        } else {
            return null;
        }
    } catch (error) {
        console.log();
        console.error(error);
        console.log();
        return null;
    }
}

module.exports = { manageLogin };
