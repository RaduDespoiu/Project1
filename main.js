import sqlite3 from 'sqlite3'

// Connection to the database

const db = new sqlite3.Database("test.db")

let createStudentTable = `
CREATE TABLE IF NOT EXISTS Student (
    Sd_ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    PhoneNumber TEXT NOT NULL,
    FieldOfStudy TEXT NOT NULL
);`;

let createGuideTable = `
CREATE TABLE IF NOT EXISTS Guide (
    Guide_ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Study TEXT NOT NULL
);`;

let createCaseTable = `
CREATE TABLE IF NOT EXISTS StudentCase (
    Case_ID INTEGER PRIMARY KEY,
    Sd_ID INTEGER NOT NULL,
    Status TEXT NOT NULL,
    Accepted BOOLEAN NOT NULL,
    Guide_ID INTEGER,
    FOREIGN KEY (Sd_ID) REFERENCES Student(Sd_ID),
    FOREIGN KEY (Guide_ID) REFERENCES Guide(Guide_ID)
);`;

let createRegistrationCodesTable = `
CREATE TABLE IF NOT EXISTS RegistrationCodes (
    Code TEXT PRIMARY KEY
);`;

let createAdminTable = `
CREATE TABLE IF NOT EXISTS Admin (
    Admin_ID INTEGER PRIMARY KEY,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Name TEXT NOT NULL
);`;

db.serialize( (/*arguments*/) => {

// Example of executing the table creation (assuming you have an SQLite connection named `db`)
    db.run(createStudentTable);
    db.run(createGuideTable);
    db.run(createCaseTable);
    db.run(createRegistrationCodesTable);
    db.run(createAdminTable);


    // db.run(`INSERT INTO Student (Name, Email, PhoneNumber, FieldOfStudy) VALUES 
    //     ('Alice Johnson', 'alice@example.com', '1234567890', 'Computer Science'),
    //     ('Bob Smith', 'bob@example.com', '0987654321', 'Mechanical Engineering'),
    //     ('Carol White', 'carol@example.com', '1122334455', 'Electrical Engineering');`);

    // // Insert sample data into Guide table
    // db.run(`INSERT INTO Guide (Name, Email, Password, Study) VALUES 
    //     ('Dr. Emily Brown', 'emily@example.com', 'password123', 'Computer Science'),
    //     ('Dr. John Green', 'john@example.com', 'password456', 'Mechanical Engineering');`);

    // // Insert sample data into StudentCase table
    // db.run(`INSERT INTO StudentCase (Sd_ID, Status, Accepted, Guide_ID) VALUES 
    //     (1, 'Pending', 0, 1),
    //     (2, 'Accepted', 1, 2),
    //     (3, 'Rejected', 0, 1);`);
        
})

// db.all("SELECT * FROM Student", [/* Arguments if ? */], (err, rows) => { if (!err && rows) { console.log(row.Name) } })
//                                                      // (err, row) -> arguments that it outputs: err = error and row = rows that it received


function getAllNames() {
    return new Promise((resolve, reject) => {
       db.all("SELECT Name, Sd_ID FROM Student", [], (err, rows) => {
          resolve(rows);
       })
    })
}

getAllNames().then( (res) => { console.log(res) } )

db.close()

//changes

//test2



