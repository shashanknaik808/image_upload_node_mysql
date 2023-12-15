const express = require('express');
const { engine } = require('express-handlebars');
// const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());

//Temlating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    console.log(req.body);
    res.end('Thank you');
});

app.listen(5000, () => {
    console.log("Server Started at Port 5000");
});