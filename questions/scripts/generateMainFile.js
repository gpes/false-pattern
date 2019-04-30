const path = require('path');
const fs = require('fs');

let usersRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'usuarios.json'));
let newCalcsRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'newCalcs.json'));
let usersThatFinishedRawData = fs.readFileSync(path.join(__dirname, '..', '..', 'questions-data', 'usernamesFinishedQuestions.json'));

let users = JSON.parse(usersRawData);
let newCalcs = JSON.parse(newCalcsRawData);
let usernamesFinished = JSON.parse(usersThatFinishedRawData);