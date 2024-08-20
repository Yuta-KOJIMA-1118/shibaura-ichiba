const { manageSignup } = require('../../informationManagementLayer/C7_customerInfoManagement/manageSignup');
const express = require('express');
const router = express.Router();

router.get('/registerUser', async function (request, response) {
    const name = request.query.name;
    const password = request.query.password;
    const omiya = request.query.omiya === '1' ? 1 : 0;
    const toyosu = request.query.toyosu === '1' ? 1 : 0;

    let isRegistered = false;
    try {
        isRegistered = await manageSignup(name, password, omiya, toyosu);
    } catch (error) {
        console.error('Registration error:', error);
        isRegistered = false;
    }
    const res = {
        data: isRegistered
    }
    response.json(res);
});

module.exports = router;
