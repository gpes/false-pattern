import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import fs from 'fs'

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    methods: ['GET', 'POST', 'OPTIONS']
}))

app.get('/project-names', (req, res) => {
    try {
        let rawData = fs.readFileSync(path.join(__dirname, '..', 'selected-projects', 'projectNames.txt'), 'utf8');
        res.status(200).json(rawData.split('\n'))
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

app.get('/benchmarking/:projectName', (req, res) => {
    try {
        let rawData = fs.readFileSync(path.join(__dirname, '..', 'benchmarking', `${req.params.projectName}.json`));
        let jsonData = JSON.parse(rawData);
        res.status(200).json(jsonData);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

});

app.get('/detection/:projectName', (req, res) => {
    try {
        let rawData = fs.readFileSync(path.join(__dirname, '..', 'false-patterns', 'falsePatterns.json'));
        let jsonData = JSON.parse(rawData);

        let projectName = req.params.projectName;

        let projectDatas = jsonData.falsePatterns.filter(fp => fp.projectName === projectName)

        res.status(200).json(projectDatas[0]);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

app.listen(app.get('port'), () => {
    console.log('Server is running...')
});