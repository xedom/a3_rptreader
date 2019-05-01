const rptfilter = document.querySelector('input#rptfilter');
const rptlist = document.querySelector('select#rptlist');
const rptlog = document.querySelector('textarea#rptlog');
const rptgetlink = document.querySelector('input#rptgetlink');
const rptdownload = document.querySelector('input#rptdownload');

window.addEventListener('load', init);

async function init() {
    await fetchRptList();
    await fetchRptLog();
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
    return fetch('/getRptLog', {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(data => data.json()).then(rpt => {
        rptlog.textContent = rpt.rptlog;
    });
};