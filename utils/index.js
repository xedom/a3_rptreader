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

module.exports = { getRptList }