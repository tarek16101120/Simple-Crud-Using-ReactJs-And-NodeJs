const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

const dbcc = {
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
};

const con = mysql.createConnection(dbcc);
con.connect(function (error) {
  if (error) {
    console.log("Connection Fail");
  } else {
    console.log("connnection Successs");
  }
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const roll = req.body.roll;
  const Class = req.body.Class;

  con.query(
    "INSERT INTO student (id, name, roll, Class) VALUES (?,?,?,?)",
    [id, name, roll, Class],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/students", (req, res) => {
  con.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  con.query(
    "UPDATE student SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM student WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3101, () => {
  console.log("Hi, Your Server is running on port 3101");
});
