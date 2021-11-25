const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

const connection = mysql.createPool({
  host     : 'velo-components.c1jrhk9b0rum.eu-central-1.rds.amazonaws.com',
  user     : 'admin',
  password : decrypt('2182d8992e652a206118'), // TODO encrypt
  database : 'velo-components'
});

// Starting our app.
const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/categories', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM component_category', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://EXPC02YL10KLVCH:3000/categories so you can see the data.');
});