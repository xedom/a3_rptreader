const fs = require('fs');
const path = require('path');

function getRptList(logspath) {
    logspath = path.resolve(logspath);
    const rptList = fs.readdirSync(logspath,"utf-8");
    const filteredRptList = rptList.filter(file => path.extname(file) == '.rpt');
    const mappedRptList = filteredRptList.map(rpt => ({ 
        rpt: rpt,
        name: path.basename(rpt,'.rpt'),
        path: logspath+rpt
    }));

    return mappedRptList;
};

function getRptLog(rpt, logspath) {
    const rptpath = path.resolve(logspath, rpt);
    const rptLog = fs.readFileSync(rptpath,"utf-8");
    return rptLog;
};

async function publishRptLog(rpt, logspath) {
    const publicPath = path.resolve(__dirname,'..','public','logs');
    await fs.readdir(publicPath, err => {
        if (err) return fs.mkdirSync(publicPath);
        return;
    });
    const rootPath = await path.resolve(logspath,rpt+'.rpt');
    const destPath = await path.resolve(publicPath,rpt);
    await fs.copyFileSync(rootPath,destPath);
    return;
};

module.exports = { getRptList, getRptLog, publishRptLog }