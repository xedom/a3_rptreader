const express = require('express');
const app = express();
const io = require('socket.io')(8001);
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', (req, res) => { res.render('index.pug'); });
app.listen(8000, () => console.log('Server Avviato'));

// const pathDir = path.resolve('home','servers','armaServer','life','confing','logs');
const pathDir = path.resolve(__dirname,'logs');

io.on('connection', socket => {
    fs.readdir(pathDir,(err, data) => {
        console.log(data)
        io.emit('folders',data);
    });

    socket.on('file', data => {
        const filee = path.resolve(pathDir, data);
        fs.readFile(filee,'utf8', (e, f) => {
            socket.emit('rpt', f);
        });
    });
});