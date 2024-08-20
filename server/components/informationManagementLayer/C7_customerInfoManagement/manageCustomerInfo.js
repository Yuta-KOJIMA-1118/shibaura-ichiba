const { Student } = require('../../../models');

async function manageCustomerInfo(name, password, type, omiya = 0, toyosu = 0) {
    console.log(name, password, type, omiya, toyosu);

    if (type === 'login') {
        return await login(name, password);
    } else if (type === 'signup') {
        return await signup(name, password, omiya, toyosu);
    }
}

module.exports = { manageCustomerInfo };

async function signup(name, password, omiya, toyosu) {
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
        console.error(err);
        console.log();
        return false;
    }
}

async function login(name, password) {
    try {
        const result = await Student.findOne({
            where: {
                name: name,
                password: password
            }
        });
        if (result != null) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log();
        console.error(err);
        console.log();
        return false;
    }
}
