var express = require('express');
var router = express.Router();
const fs = require('fs');
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('came inside');
        return res.render('errorcorrections', { title: 'Express' });
        //return res.status(200).send('No files were uploaded.');
    }
    
    //res.send('respond with a resource');
});


router.post('/upload', (req,res,next) => {
    //console.log(req.files.json_file);

    let fileObject = req.files.json_file;
    let filePath = process.cwd() + '/uploads/' + req.files.json_file.name;
    fileObject.mv(filePath, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(filePath);
            console.log("uploaded");
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }

                originalArray = [];
                writeObject = [];
                let data_1 = JSON.parse(data);
                let objData = data_1.data;
                //console.log(typeof (data_1.data));
                //console.log(data_1.data);
                //return;
                for (let index = 0; index < objData.length; index += 1) {
                    element = objData[index];
                    eleData = element.data;

                    //console.log(element);
                    if (eleData.subType == 'error-correction') {
                        originalArray.push(element.id);
                    } else {
                        writeObject.push(element);
                    }

                }
                let writeString = '{ "success": true,"data":' + JSON.stringify(writeObject) + ',"message": null}';
                //console.log(writeObject);
                fs.writeFile('mynewfile3.json', writeString, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                res.render('duplicate', { 'data': originalArray, 'object': JSON.stringify(writeObject), 'message': ''});
            })
        }
    });

    //return;
    
});

router.post('/pick', (req, res, next) => {
    //console.log(req.files.json_file);

    let token = req.body.token;
    let customer = req.body.customer;
    let type = req.body.type;
    var api;

    switch (customer) {
        case 'sjs':
            api = "https://api.sheridan-articleexpress.com";
            break;
        case 'elsevier':
            api = "https://elsevierapi.proofcentral.com";
            break;
        case 'lsa':
            api = "https://api.proofcentral.com";
            break;
        case 'mre':
            api = "https://api.proofcentral.coms";
            break;
        case 'rsc':
            api = "https://rscjournalsapi.proofcentral.com";
            break;
        case 'degruyter':
            api = "https://uatdegruyterapi.proofcentral.com";
            break;
        
    }
    url = api +"/index.php/getCorrection/"+token+'/abc'
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if(json.success == true)
            {
                originalArray = [];
                writeObject = [];
                //let data_1 = json.data;
                let objData = json.data;
                //console.log(typeof (data_1.data));
                //console.log(data_1.data);
                //return;
                for (let index = 0; index < objData.length; index += 1) {
                    element = objData[index];
                    eleData = element.data;

                    //console.log(type);
                    if (eleData.type == type) {
                        originalArray.push(element.id);
                    } else {
                        writeObject.push(element);
                    }

                }
                let writeString = '{ "success": true,"data":' + JSON.stringify(writeObject) + ',"message": null}';
                //console.log(writeObject);
                fs.writeFile('mynewfile3.json', writeString, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                res.render('duplicate', { 'data': originalArray, 'object': JSON.stringify(writeObject), 'message': '' });

            } else {
                res.render('duplicate', { 'data': [], 'object': JSON.stringify([]), 'message': json.message });
            }
        })
        .catch(err => console.log(err));

    

});

module.exports = router;
