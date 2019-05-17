const path = require('path');
const fs = require('fs');

function alreadyHasPattern(theresResulsts, patternName) {
    // Se maior que zero, então o padrão já existe e TRUE é retornado
    return theresResulsts.filter(result => result.patternName === patternName).length > 0
}

function alreadyHasTerm(theresResulsts, patternName, term) {
    // Se o termo já existir no obj do padrão, então TRUE é retornado 
    return theresResulsts
            .find(result => result.patternName === patternName)
            .terms.includes(term)
}

let mainRawDatas = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', `mainDatas.json`));
let mainDatas = JSON.parse(mainRawDatas);

let finalResults = [];

for(let i = 0; i < mainDatas.length; i++) {
    let respostas = mainDatas[i].respostas;

    for(let j = 0; j < respostas.length; j++) {
        let padrao = respostas[j].padrao;
        
        if(!alreadyHasPattern(finalResults, padrao)) {
            finalResults.push({
                patternName: padrao,
                terms: [...respostas[j].termos]
            });
        } else {
            let termos = respostas[j].termos;

            for(let k = 0; k < termos.length; k++) {
                let termo = termos[k];
                
                if(!alreadyHasTerm(finalResults, padrao, termo)) {
                    finalResults = finalResults.map(result => {
                        if(result.patternName === padrao) {
                            result.terms.push(termo);
                            return result;
                        } 
                    })
                }
            }
        }
    }
}

