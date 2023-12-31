require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const closeDatabaseConnection = require("./db");

const PORT = process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'

const app = express();
// mongoDbConnection()

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  