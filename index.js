const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', (req, res) => { res.render('index.pug'); });
app.listen(8000, () => console.log('Server Avviato'));