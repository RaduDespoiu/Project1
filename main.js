import sqlite3 from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

// Connection to the database
const db = new sqlite3.Database("project_database.db");

// Express app setup
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json()); // Use JSON body parser

// Create tables
const createStudentTable = `CREATE TABLE IF NOT EXISTS Student (Sd_ID INTEGER PRIMARY KEY, Name TEXT NOT NULL, Email TEXT NOT NULL UNIQUE, PhoneNumber TEXT NOT NULL, FieldOfStudy TEXT NOT NULL);`;
const createGuideTable = `CREATE TABLE IF NOT EXISTS Guide (Guide_ID INTEGER PRIMARY KEY, Name TEXT NOT NULL, Email TEXT NOT NULL UNIQUE, Password TEXT NOT NULL, Study TEXT NOT NULL);`;
const createCaseTable = `CREATE TABLE IF NOT EXISTS StudentCase (Case_ID INTEGER PRIMARY KEY, Sd_ID INTEGER NOT NULL, Status TEXT NOT NULL, Accepted BOOLEAN NOT NULL, Guide_ID INTEGER, FOREIGN KEY (Sd_ID) REFERENCES Student(Sd_ID), FOREIGN KEY (Guide_ID) REFERENCES Guide(Guide_ID));`;
const createRegistrationCodesTable = `CREATE TABLE IF NOT EXISTS RegistrationCodes (Code TEXT PRIMARY KEY);`;
const createAdminTable = `CREATE TABLE IF NOT EXISTS Admin (Admin_ID INTEGER PRIMARY KEY, Email TEXT NOT NULL UNIQUE, Password TEXT NOT NULL, Name TEXT NOT NULL);`;

db.serialize(() => {
    db.run(createStudentTable);
    db.run(createGuideTable);
    db.run(createCaseTable);
    db.run(createRegistrationCodesTable);
    db.run(createAdminTable);
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT Password FROM Guide WHERE Email = ?", [email], (err, row) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else if (!row) {
            res.status(401).send("Invalid email or password");
        } else {
            const hashedPassword = row.Password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (result) {
                    res.send("Login successful");
                } else {
                    res.status(401).send("Invalid email or password");
                }
            });
        }
    });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});