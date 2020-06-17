var express = require('express');
var router = express.Router();
const fs = require('fs');
const neatCsv = require('neat-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'out_csv/out_1.csv',
    header: [
        { id: 'id', title: 'Id' },
        { id: 'start', title: 'start' },
        { id: 'end', title: 'end' },
        { id: 'para', title: 'para' },
        { id: 'name', title: 'name' },
        { id: 'timestamp', title: 'timestamp' },
        { id: 'actor', title: 'actor' },
        { id: 'type', title: 'type' },
        { id: 'text', title: 'text' }
    ]
});



/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.render('csv', { title: 'Express' });
        //return res.status(200).send('No files were uploaded.');
    }
    
    res.send('respond with a resource');
});


router.post('/upload', (req,res,next) => {
    console.log(req.files.csv_files);
});

module.exports = router;
