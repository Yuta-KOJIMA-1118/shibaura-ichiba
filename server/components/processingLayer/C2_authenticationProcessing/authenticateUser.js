const { manageLogin } = require('../../informationManagementLayer/C7_customerInfoManagement/manageLogin');
const express = require('express');
const router = express.Router();

router.get('/authenticateUser', async function (request, response) {
    const name = request.query.name;
    const password = request.query.password;
    console.log("start authenticateUser: "+ name + " " + password) //expressとの接続確認用に小島が追加，勝手に削除しても構わない．
    
    let isAuthenticated = null;
    try {
        isAuthenticated = await manageLogin(name, password);
    } catch (error) {
        console.error('Authentication error:', error);
        isAuthenticated = null;
    }
    const res = {
        data: isAuthenticated
    }
    response.json(res);
});

module.exports = router;
