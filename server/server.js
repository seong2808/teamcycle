const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
const db = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/build')));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// 보관소
app.get('/api/test', (req,res) =>{
  res.send( {test:'Server Response Success'} );
})

app.get('/api/bike_port', (req, res) => {
  connection.query(

    "select * from bike_port",
    (err, data) => {
            if(!err) {
                res.send(data);
      
            } else {
                console.log(err);
                res.send(err);
            }
  })
});

// 대여소  
app.get('/api/bike_rental', (req, res) => {
  connection.query(
    
    "select * from bike_rental",
    (err, data) => {
            if(!err) {
                res.send(data);
      
            } else {
                console.log(err);
                res.send(err);
            }
  })
});

app.listen(PORT, () => console.log(`Server On : http://localhost:${PORT}/`));
