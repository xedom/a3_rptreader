const express = require('express');
const app = express();
const cfg = require('./config.json');
const { getRptList, getRptLog, publishRptLog } = require('./utils');
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => { res.render('index.pug'); });

app.get('/getRptList', async (req, res) => {
    const list = await getRptList(cfg.logsPath);

    return res.json(list);
});

app.post('/getRptLog', async (req, res) => {
    const rptlog = await getRptLog(req.body.rpt, cfg.logsPath);

    return res.json({ rptlog });
});

app.post('/downloadRptLog', (req, res) => {
    const rptlog = path.resolve(cfg.logsPath,req.body.rpt);
    res.download(rptlog);
});

app.post('/getLinkRptLog', async (req, res) => {
    await publishRptLog(req.body.name, cfg.logsPath);
    return res.json({ rpturl: `/log/${req.body.name}` });
});

app.get('/log/:id', (req, res) => {
    const log = path.resolve(__dirname,'public','logs',req.params.id);
    res.set('Content-Type', 'text/plain');
    return res.sendFile(log);
});

app.listen(cfg.port, () => console.log(`[Server] > RPT Reader started on port: ${cfg.port}`));