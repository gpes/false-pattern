const path = require('path');
const fs = require('fs');

let devTermsRawDatas = fs.readFileSync(path.join(__dirname, '.', `devTerms.json`));
let catalogTermsRawDatas = fs.readFileSync(path.join(__dirname, '.', `catalogTerms.json`));
let devTermsDatas = JSON.parse(devTermsRawDatas);
let catalogTermsDatas = JSON.parse(catalogTermsRawDatas);

let unionTerms = devTermsDatas
    .map(devTerm => {
        let catalogTerm = catalogTermsDatas.find(catalogTerm => catalogTerm.patternName === devTerm.patternName)
        return {
            patternName: devTerm.patternName,
            terms: [...new Set([...new Set(devTerm.terms), ...new Set(catalogTerm.terms)])]
        }
    });

fs.writeFileSync(path.join(__dirname, '.', `unionTerms.json`), JSON.stringify(unionTerms));
