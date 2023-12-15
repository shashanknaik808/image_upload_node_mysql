const express = require('express');
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(fileUpload());

//Static Files
app.use(express.static('public'));
app.use(express.static('upload'));

//Temlating Engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'userprofile'
});

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected');
})


app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected');

        connection.query('SELECT * FROM user WHERE id = "1"', (err, rows) => {
            connection.release();

            if (!err) {
                res.render('index', { rows });
            }
        });
    });
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

        // res.send("File uploaded successfully");

        pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log('Connected');

            connection.query('UPDATE user SET profile_image = ? WHERE id="1"', [sampleFile.name], (err, rows) => {
                connection.release();

                if (!err) {
                    res.redirect('/');
                } else {
                    console.log(err);
                }
            });
        });
    });

    // return res.end("Thank You");
});

app.listen(5000, () => {
    console.log("Server Started at Port 5000");
});