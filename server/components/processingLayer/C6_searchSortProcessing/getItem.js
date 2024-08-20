var express = require('express');
var router = express.Router();
const getItems = require('../../informationManagementLayer/C9_inventoryInfoManagement/getItems')
const { Stock, Textbook } = require('../../../models');

//@author 小島佑太

router.get('/textbooks', async function(req, res, next) {
  try {
    const textbooks = await Textbook.findAll();
    res.json(textbooks);
  } catch (error) {
    console.error('Error fetching textbooks:', error);
    next(error);
  }
});

router.get('/', async function(req, res, next) {
  const { studentId, searchQuery, subjectName, professorName } = req.query;
  try {
    console.log("studentId: "+studentId)
    console.log("subjectNames: "+subjectName)
    console.log("professorNames: "+professorName)
    const result = await getItems(studentId, searchQuery, subjectName, professorName);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    next(error);
  }
});

module.exports = router;
