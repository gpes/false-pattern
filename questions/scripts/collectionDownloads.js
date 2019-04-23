/*
    Command example:
        node collectionDownloads.js collectionName mongolabApiKey
*/

const https = require('https');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
let collectionName = args[0];
let apiKey = args[1];

let url = `https://api.mlab.com/api/1/databases/heroku_xsthkcm6/collections/${collectionName}?apiKey=${apiKey}`;

https.get(url, resp => {
    let data = '';

    resp.on('data', chunk => data += chunk);

    resp.on('end', () => {
        try {
            fs.writeFileSync(path.join(__dirname, '..', '..', 'questions-data', `${collectionName}.json`), data);
            console.log('Everything is okay. That\'s works :)');
        } catch(e) {
            console.log('We have a problem :/\n', e.message);
        }
    })
});