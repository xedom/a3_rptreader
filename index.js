const express = require('express');
const app = express();
const utils = require('./utils');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', (req, res) => { res.render('index.pug'); });

app.get('/getRptList', (req, res) => {
    res.json('test');
});

app.listen(8000, () => console.log('Server Avviato'));