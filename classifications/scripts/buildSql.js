const fs = require('fs');
const path = require('path');
const axios = require('axios');

function linkFormat(entityClassPath, projectName) {
    let pathWithSlashs = entityClassPath.split('.').join('/');
    
    let splitPathWithSlashs = pathWithSlashs.split('/');
    let lastResouce = splitPathWithSlashs[splitPathWithSlashs.length - 1]
    let treatedLastResouce = lastResouce.includes('$') ? lastResouce.split('$')[0] : lastResouce;
    splitPathWithSlashs[splitPathWithSlashs.length - 1] = treatedLastResouce;
    pathWithSlashs = splitPathWithSlashs.join('/');

    if(projectName === 'collections-3.2.1' && pathWithSlashs.includes('Test') || projectName === 'quilt-0.6-a-5' && pathWithSlashs.includes('Test')) {
        pathWithSlashs = `test/${pathWithSlashs}.java`;
    } else if(entityClassPath !== 'com.jgoodies.uif_lite.component.Factory' && projectName === 'jext-5.0') { 
        pathWithSlashs = `lib/${pathWithSlashs}.java`;
    } else if(projectName === 'collections-3.2.1' || projectName === 'oscache-2.3' || projectName === 'quilt-0.6-a-5') {
        pathWithSlashs = `java/${pathWithSlashs}.java`;
    } else if(projectName === 'quickserver-1.4.7') {
        pathWithSlashs = `main/${pathWithSlashs}.java`;
    } else {
        pathWithSlashs = `${pathWithSlashs}.java`;
    }

    let formatedLink = `https://raw.githubusercontent.com/natansevero/qualitas-class-corpus-projects/master/${projectName}/src/${pathWithSlashs}`;

    return formatedLink;
}

async function buildSqlFile(metrics, removedEntities) {
    let sqlString = '';

    for(let i = 0; i < metrics.length; i++) {
        let metric = metrics[i];
        
        if(!removedEntities.includes(metric.entityName)) {
            let insertSql = `INSERT INTO indicio (projeto, entidade, link, metrica) VALUES ('${metric.projectName}', '${metric.entityName}', '${metric.link}', '${metric.metricValue}');\n` 
            sqlString += insertSql;

            try {
                let res = await axios.get(metric.link);
            } catch(e) {
                console.log(metric.link);
            }
        }
    }

    fs.writeFileSync(path.join(__dirname, 'insert.sql'), sqlString);
}

(function main() {
    const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'false-patterns', 'falsePatternsUnionTerms.json'));
    const data = JSON.parse(rawData);
    const falsePatterns = data.falsePatterns;

    const removedEntitiesRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'false-patterns', 'removedEntities.json'));
    const removedEntitiesData = JSON.parse(removedEntitiesRawData);
    
    let allMetricsWithProjectName = [];
    
    for(let i = 0; i < falsePatterns.length; i++) {
        let metricsWithProjectName = falsePatterns[i].metrics.map(metric => ({ ...metric, projectName: falsePatterns[i].projectName }))
        
        allMetricsWithProjectName = [...allMetricsWithProjectName, ...metricsWithProjectName]
    }
    
    let metricsAndLinks = allMetricsWithProjectName.map(metric => ({ ...metric, link: linkFormat(metric.entityName, metric.projectName) })); 
    
    let allRemovedEntities = [];
    for(let j = 0; j < removedEntitiesData.length; j++) {
        let entities = removedEntitiesData[j].metrics.map(metric => metric.entityName);

        allRemovedEntities = [...allRemovedEntities, ...entities]
    }

    buildSqlFile(metricsAndLinks, allRemovedEntities);
})();




