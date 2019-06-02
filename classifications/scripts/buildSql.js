const fs = require('fs');
const path = require('path');

function linkFormat(entityClassPath, projectName) {
    let pathWithSlashs = entityClassPath.split('.').join('/');
    
    let splitPathWithSlashs = pathWithSlashs.split('/');
    let lastResouce = splitPathWithSlashs[splitPathWithSlashs.length - 1]
    let treatedLastResouce = lastResouce.includes('$') ? lastResouce.split('$')[0] : lastResouce;
    splitPathWithSlashs[splitPathWithSlashs.length - 1] = treatedLastResouce;
    pathWithSlashs = splitPathWithSlashs.join('/');

    if(projectName === 'collections-3.2.1' && pathWithSlashs.includes('Test') || projectName === 'quilt-0.6-a-5' && pathWithSlashs.includes('Test')) {
        pathWithSlashs = `test/${pathWithSlashs}.java`;
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

function buildSqlFile(metrics) {
    let sqlString = '';

    for(let i = 0; i < metrics.length; i++) {
        let metric = metrics[i];

        let insertSql = `INSERT INTO indicios (projeto, entidade, link, metrica) VALUES ('${metric.projectName}', '${metric.entityName}', '${metric.link}', '${metric.metricValue}');\n` 
        sqlString += insertSql;
    }

    fs.writeFileSync(path.join(__dirname, 'insert.sql'), sqlString);
}

(function main() {
    const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'false-patterns', 'falsePatternsUnionTerms.json'));
    const data = JSON.parse(rawData);
    const falsePatterns = data.falsePatterns;
    
    let allMetricsWithProjectName = [];
    
    for(let i = 0; i < falsePatterns.length; i++) {
        let metricsWithProjectName = falsePatterns[i].metrics.map(metric => ({ ...metric, projectName: falsePatterns[i].projectName }))
        
        allMetricsWithProjectName = [...allMetricsWithProjectName, ...metricsWithProjectName]
    }
    
    let metricsAndLinks = allMetricsWithProjectName.map(metric => ({ ...metric, link: linkFormat(metric.entityName, metric.projectName) })); 
    
    buildSqlFile(metricsAndLinks);
})();




