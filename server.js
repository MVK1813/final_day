const express = require("express");

const cors = require("cors");

const mysql = require("mysql");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "Password@123",

    database: "emp"

})



app.get("/employees", (req, res) => {

    const sql = "SELECT * FROM employee";

    db.query(sql, (err, data) => {

        if (err) throw err;

        return res.json(data);

    });

});



app.get("/employee/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM employee where ID= ? ";

    db.query(sql, [id], (err, results) => {

        if (err) throw err;

        return res.json(results);
    });

});



app.post("/employee", (req, res) => {

    const sql = "INSERT INTO employee (department,dob,sex,name,salary) VALUES (?)";

    const values = [

        req.body.department,

        req.body.dob,

        req.body.sex,

        req.body.name,

        req.body.salary,

    ]

    db.query(sql, [values], (err, data) => {

        if (err) throw err;

        return res.json(data);

    });

});



app.put("/editemployee/:id", (req, res) => {

    const sql = "update employee set `department` = ?,`salary` = ?,`dob` = ?,`name` = ?,`sex` = ? where ID = ?";

    const values = [req.body.department, req.body.salary, req.body.dob, req.body.name, req.body.sex]

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {

        if (err) throw err;

        return res.json(data);

    });

});



app.delete("/deleteemployee/:id", (req, res) => {

    const sql = "DELETE FROM employee WHERE ID = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {

        if (err) throw err;

        return res.json(data);

    });

});



app.post("/reguser", async (req, res) => {
    const sql = "INSERT INTO reguser (name,email,password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password];
    db.query(sql, [values], (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});


app.get("/getresponse/:email/:password", (req, res) => {
    const sql = "SELECT email FROM reguser WHERE email=@email";
    db.query(sql, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});


app.listen(8082, () => { console.log("listening"); })