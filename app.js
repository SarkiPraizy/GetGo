require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const closeDatabaseConnection = require("./db");

const PORT = process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'

const app = express();
// mongoDbConnection()

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));

app.set('view engine', 'ejs');
app.set('views', "views");


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  