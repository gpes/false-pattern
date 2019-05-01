const path = require('path');
const fs = require('fs');

let usersRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'usuarios.json'));
let newCalcsRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'newCalcs.json'));
let usersThatFinishedRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'usernamesFinishedQuestions.json'));

let users = JSON.parse(usersRawData);
let newCalcs = JSON.parse(newCalcsRawData);
let usernamesFinished = JSON.parse(usersThatFinishedRawData);

let mainDatas = usernamesFinished.map(username => {
    let user = users
        .filter(u => u.resposta.length > 0)
        .find(u => u.username === username);
    
    let calc = newCalcs
        .find(c => c.usuario === username);

    return {
        usuario: username,
        resposta: user.resposta,
        suguestao: user.suguestao,
        exp: calc.exp
    }
})

fs.writeFileSync(path.join(__dirname, '..', '..', 'questions-data', `mainDatas.json`), JSON.stringify(mainDatas));