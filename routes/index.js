var express = require('express'), fs = require('fs'),  ids = [];
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('public/javascripts/getCorrection_bak.json', 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data);
    let activeFlag = false;
    for (i = 0; i < jsonData['data'].length; i += 1) {
      // from id only change
      if (jsonData['data'][i]['id'] === 25977628) { // from id
        activeFlag = true;
      }
      if (activeFlag === true) {
        ids.push(jsonData['data'][i]['id']);
      }
      // to id only change
      if (jsonData['data'][i]['id'] === 25978296) { // to id
        activeFlag = false;
      }
    }
    res.render('index', { title: 'Express', data: ids });
  })
  
});

module.exports = router;
