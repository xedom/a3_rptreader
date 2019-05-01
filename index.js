const express = require('express');
const app = express();
const cfg = require('./config.json');
const utils = require('./utils');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', (req, res) => { res.render('index.pug'); });

app.get('/getRptList', (req, res) => {
    res.json('test');
});

app.listen(cfg.port, () => console.log(`[Server] > RPT Reader started on port: ${cfg.port}`));