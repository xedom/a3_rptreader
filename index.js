const express = require('express');
const app = express();
const cfg = require('./config.json');
const { getRptList } = require('./utils');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', (req, res) => { res.render('index.pug'); });

app.get('/getRptList', async (req, res) => {
    const list = await getRptList(cfg.logsPath);

    return res.json(list);
});

app.listen(cfg.port, () => console.log(`[Server] > RPT Reader started on port: ${cfg.port}`));