const rptfilter = document.querySelector('input#rptfilter');
const rptlist = document.querySelector('select#rptlist');
const rptlog = document.querySelector('textarea#rptlog');
const rptgetlink = document.querySelector('input#rptgetlink');
const rptdownload = document.querySelector('input#rptdownload');
// rptlist.innerHTML += `<option value=${rpt.rpt}>${rpt.name}</option>`;

window.addEventListener('load', init);

async function init() {
    await fetch('/getRptList').then(data => data.json()).then(rpts => {
        rpts.forEach(rpt => {
            const option = document.createElement('OPTION');
            option.value = rpt.rpt;
            option.textContent = rpt.name;

            rptlist.append(option);
        });
    });
};