const express = require('express');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(fileUpload());

//Static Files
app.use(express.static('public'));
app.use(express.static('upload'));

//Temlating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No image were selected.');
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;

    console.log(sampleFile);

    //Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send('File Uploaded');
    });

    // return res.end("Thank You");
});

app.listen(5000, () => {
    console.log("Server Started at Port 5000");
});