var express = require('express');
var router = express.Router();
const fs = require('fs');


/* GET users listing. */
router.get('/', function(req, res, next) {

    fs.readFile('getCorrection_bck.json', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        originalArray = [];
        writeObject = [];
        //console.log(JSON.parse(data));
        let data_1 = JSON.parse(data);
        let objData = data_1.data;
        //console.log(typeof (data_1.data));
        for (let index = 0; index < objData.length; index += 1) {
            element = objData[index];
            eleData = element.data;
           
                //console.log(element);
                if (eleData.type == 'error-instruction') {
                    originalArray.push(element.id);
                } else {
                    writeObject.push(element);
                }                
            
        }
        let writeString = '{ "success": true,"data":' + writeObject + ',"message": null}';
        console.log(writeObject);
        fs.writeFile('mynewfile3.json', writeString, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.render('duplicate', { 'data': originalArray, 'object': JSON.stringify(writeObject) });
    })    
    
    
});


/* GET users listing. */
router.get('/arraypop', function (req, res, next) {

    const originalArray = [];
    const newArray = [];

    fs.readFile('getCorrection.json', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        
        //console.log(JSON.parse(data));
        let data_1 = JSON.parse(data);
        let objData = data_1.data;
        //console.log(typeof (data_1.data));
        for (let index = 0; index < objData.length; index += 1) {
            element = objData[index];
            eleData = element.data;
            eleid = element.id;

            originalArray.push(element.id);

        }
        console.log(writeObject);
        
    });

    fs.readFile('getCorrection_new.json', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        console.log(JSON.parse(data));
        return false;
        let data_1 = JSON.parse(data);
        let objData = data_1.data;
        //console.log(typeof (data_1.data));
        for (let index = 0; index < objData.length; index += 1) {
            element = objData[index];
            eleData = element.data;
            eleid = element.id;

            newArray.push(element.id);

        }
        console.log(newArray);

    })


});

router.get('/removed_id', function (req, res, next) {
// get only removed ids
    const originalArray = [];
    const newArray = [];

    fs.readFile('getCorrection.json', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let new_data_1 = JSON.parse(data);
        let new_objData = new_data_1.data;
        for (let index = 0; index < new_objData.length; index += 1) {
            element = new_objData[index];
            eleData = element.data;
            eleid = element.id;
            newArray.push(element.id);

        }
        res.render('duplicate', { 'data': newArray });
    });

    

    // fs.readFile('getCorrection_bck.json', (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }

    //     //console.log(JSON.parse(data));
    //     let data_1 = JSON.parse(data);
    //     let objData = data_1.data;
    //     //console.log(typeof (data_1.data));
    //     for (let index = 0; index < objData.length; index += 1) {
    //         element = objData[index];
    //         eleData = element.data;
    //         eleid = element.id;
    //         if (newArray.indexOf(eleid) == -1) {
    //             originalArray.push(eleid);
    //         }        
    //     }

    //     res.render('duplicate', { 'data': originalArray });
    // });


});

module.exports = router;
