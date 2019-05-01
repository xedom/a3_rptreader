const rptfilter = document.querySelector('input #rptfilter');
const rptlist = document.querySelector('select #rptlist');
const rptlog = document.querySelector('textarea #rptlog');
const rptgetlink = document.querySelector('input #rptgetlink');
const rptdownload = document.querySelector('input #rptdownload');

window.addEventListener('load', init);

function init() {
    fetch('/getRptList').then(data => data.json()).then(rpts => {
        console.log(rpts);
    });
};