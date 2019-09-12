const mysql = require("mysql");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("bezkoder_mysql_fastcsv.csv");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "testdb"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;

  // query data from MySQL
  connection.query("SELECT * FROM category", function(error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("Write to bezkoder_mysql_fastcsv.csv successfully!");
      })
      .pipe(ws);
  });
});
