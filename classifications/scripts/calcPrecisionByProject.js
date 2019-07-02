const csv = require('csvtojson');
// const fs = require('fs');
const path = require('path');

(async () => {
    let trueClassifications = await csv()
        .fromFile(path.join(__dirname, '..', '..', 'classifications-data', 'true-answers.csv'))
    
    let falseClassifications = await csv()
        .fromFile(path.join(__dirname, '..', '..', 'classifications-data', 'false-answers.csv'))

    let groupProjects = [];


})()