const socket = io.connect('http://127.0.0.1:8001');
const form = document.querySelector('form .logss');
const ta = document.querySelector('form textarea');

socket.on('update', data => {
    console.log(data)
})

socket.on('folders', data => {
    form.innerHTML='';

    data.forEach(file => {
        let button = document.createElement('input');
        button.className = 'loggg';
        button.type= 'button';
        button.value= file;
        
        form.appendChild(button);
    });
})

socket.on('rpt', data => {
    ta.value = data;
});

form.addEventListener('click', ev => {
    if(ev.target.classList.contains('loggg')) {
        socket.emit('file', ev.target.value);
    };
});

