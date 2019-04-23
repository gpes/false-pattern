const path = require('path');
const fs = require('fs');

let usersRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'usuarios.json'));
// let calcsRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'calcs.json'));
let usersData = JSON.parse(usersRawData);
// let calcsData = JSON.parse(calcsRawData);

let usersFinishQuestions = usersData.filter(user => user.resposta.length > 0);

let usernamesFinishQuestions = usersFinishQuestions.map(user => user.username);

fs.writeFileSync(path.join(__dirname, '..', '..', 'questions-data', `usernamesFinishedQuestions.json`), JSON.stringify(usernamesFinishQuestions));