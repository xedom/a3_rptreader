const express = require('express');
const app = express();
const cfg = require('./config.json');
const { getRptList, getRptLog, publishRptLog } = require('./utils');
const path = require('path');
const crypto = require('crypto');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function auth(req, res, next) {
    const masterPass = crypto.createHash('sha256').update(cfg.password).digest('hex');
    if (req.headers.cookie.includes(masterPass)) return next()
    else return res.redirect('/login');
};

app.get('/', auth, (req, res) => {
    res.render('index.pug');
});

app.get('/getRptList', auth, async (req, res) => {
    const list = await getRptList(cfg.logsPath);
    return res.json(list);
});

app.post('/getRptLog', auth, async (req, res) => {
    const rptlog = await getRptLog(req.body.rpt, cfg.logsPath);
    return res.json({ rptlog });
});

app.post('/downloadRptLog', auth, (req, res) => {
    const rptlog = path.resolve(cfg.logsPath,req.body.rpt);
    res.download(rptlog);
});

app.post('/getLinkRptLog', auth, async (req, res) => {
    await publishRptLog(req.body.name, cfg.logsPath);
    return res.json({ rpturl: `/log/${req.body.name}` });
});

app.get('/log/:id', (req, res) => {
    const log = path.resolve(__dirname,'public','logs',req.params.id);
    res.set('Content-Type', 'text/plain');
    return res.sendFile(log);
});

app.get('/login', (req, res) => {
    res.render('login.pug');
});

app.post('/login', (req, res) => {
    const token = req.body.pass;
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    res.json({ token: hash });
});

app.listen(cfg.port, () => console.log(`[Server] > RPT Reader started on port: ${cfg.port}`));