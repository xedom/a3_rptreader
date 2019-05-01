const passInput = document.querySelector('input#passInput');
const loginButton = document.querySelector('input#loginButton');
const formLogin = document.querySelector('form#loginBox');

window.addEventListener('load', init);

function init() {
    formLogin.addEventListener('submit', e => {
        e.preventDefault();
        fetch('/login', {
            method: 'post',
            body: JSON.stringify({ pass: passInput.value }),
            headers: { "Content-Type": "application/json" }
        }).then(data => data.json()).then(({token}) => {
            document.cookie = token;
            window.location.replace("/");
        });
    });
};