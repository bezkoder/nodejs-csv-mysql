const mysql = require("mysql");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

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

    const json2csvParser = new Json2csvParser({ header: true});
    const csv = json2csvParser.parse(jsonData);

    fs.writeFile("bezkoder_mysql_fs.csv", csv, function(error) {
      if (error) throw error;
      console.log("Write to bezkoder_mysql_fs.csv successfully!");
    });
  });
});
