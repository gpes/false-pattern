const csv = require('csvtojson');
const { Parser } = require('json2csv');  
const path = require('path');
const fs = require('fs');

(async () => {
    const metricRelations = await csv()
        .fromFile(path.join(__dirname, '..', '..', 'false-patterns', 'metricRelations.csv'))

    const trueAnswers = await csv()
        .fromFile(path.join(__dirname, '..', '..', 'classifications-data', 'true-answers.csv'))

    let finalCsv = [];

    for(let i = 0; i < trueAnswers.length; i++) {
        for(let j = 0; j < metricRelations.length; j++) {
            if(trueAnswers[i].entidade === metricRelations[j].entityName) {
                let record = metricRelations[j];
                delete record.field15;

                finalCsv.push(record)
            }
        }
    }

    console.log(finalCsv[0].toString())
    console.log("\n\n\n",finalCsv.length)

    const fields = Object.keys(finalCsv[0]);
    const json2csvParser = new Parser({ fields, quote: '' });
    const myCsv = json2csvParser.parse(finalCsv);

    fs.writeFileSync(path.join(__dirname, '..', '..', 'results', 'finalMetricRelations.csv'), myCsv);
    
})()

// fs.writeFileSync(path.join(__dirname, '..', '..', 'false-patterns', 'removedEntities.json'), JSON.stringify(allMetricsWithProjectName));
