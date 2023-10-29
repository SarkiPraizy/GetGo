const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'

const app = express();

app.set('view engine', 'ejs');
app.set('views', "views");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  //close the databse connection when the application exists
  process.on('SIGINT', () => {
      closeDatabaseConnection();
      process.exit();
  })