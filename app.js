const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//Temlating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.listen(5000, () => {
    console.log("Server Started at Port 5000");
});