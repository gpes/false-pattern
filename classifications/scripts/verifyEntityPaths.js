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

(async () => {
    const rawData = fs.readFileSync(path.join(__dirname, '..', '..', 'false-patterns', 'falsePatternsUnionTerms.json'));
    const data = JSON.parse(rawData);
    const falsePatterns = data.falsePatterns;
    
    let allMetricsWithProjectName = []
    let metrics = [];

    console.log('Comecou')
    for(let i = 0; i < falsePatterns.length; i++) {
        for(let j = 0; j < falsePatterns[i].metrics.length; j++) {
            try {
                let res = await axios.get(linkFormat(falsePatterns[i].metrics[j].entityName, falsePatterns[i].projectName));
            } catch(e) {
                console.log(j);
                metrics.push({ ...falsePatterns[i].metrics[j], entityPath: linkFormat(falsePatterns[i].metrics[j].entityName, falsePatterns[i].projectName) })
            }
        }
        
        let projectNameAndMetric = { projectName: falsePatterns[i].projectName, metrics };

        metrics = [];
    
        allMetricsWithProjectName.push(projectNameAndMetric)
    }
    console.log('terminou')

    console.log(allMetricsWithProjectName)

    fs.writeFileSync(path.join(__dirname, 'removedEntities.json'), JSON.stringify(allMetricsWithProjectName));
})();