const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
app.use(cors());
app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("hello world");
});

app.post("/getdata", (req, resp) => {
  // Configure the connection to your PostgreSQL database
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "details",
    password: "zakir123",
    port: 5432, // Default PostgreSQL port
  });
  console.log(req.body.page);
  let sqlQuery;
  // Define the SQL query to select data from the table
  if (req.body.page == 0) {
    sqlQuery = "SELECT * FROM employee LIMIT 20;";
  } else {
    sqlQuery = `SELECT * FROM employee OFFSET ${req.body.page * 20} LIMIT 20;`;
  }

  // Execute the query
  pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      pool.end(); // Close the connection pool
      return;
    }
    // Process the result
    console.log("Retrieved rows:", result.rows);
    resp.send(result.rows);

    // Close the connection pool
    pool.end();
  });
});
app.listen(5000);
