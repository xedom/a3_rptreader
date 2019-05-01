const rptfilter = document.querySelector('input#rptfilter');
const rptlist = document.querySelector('select#rptlist');
const rptlogText = document.querySelector('textarea#rptlogText');
const rptgetlink = document.querySelector('input#rptgetlink');
const rptdownload = document.querySelector('input#rptdownload');
const rptautosync = document.querySelector('i#rptautosync');
var autoSyncRpt;

window.addEventListener('load', init);

async function init() {
    await fetchRptList();
    await fetchRptLog();
    rptlist.addEventListener('change', fetchRptLog);
    rptautosync.addEventListener('click', rptAutoupdate);
};

function fetchRptList() {
    return fetch('/getRptList').then(data => data.json()).then(rpts => rpts.forEach(rpt => {
        const option = document.createElement('OPTION');
        option.value = rpt.rpt;
        option.textContent = rpt.name;

        rptlist.append(option);
    }));
};

function fetchRptLog() {
    const data = { rpt: rptlist.selectedOptions[0].value };
    console.log(data.rpt);
    return fetch('/getRptLog', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(data => data.json()).then(rpt => {
        rptlogText.textContent = rpt.rptlog;
    });
};

function rptAutoupdate({ target }) {
    if (target.className.includes('active')) {
        target.classList.remove('active');
        clearInterval(autoSyncRpt);
    } else {
        target.classList.add('active');
        autoSyncRpt = setInterval(fetchRptLog, 1000);
    };
};