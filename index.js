const inquirer = require("inquirer");
const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'ppp111',
      database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
  );

  fs.readFile('./db/schema.sql', 'utf8', function(err, data) {
    if (err) throw err;
    console.log('Successfully loaded schema file.');

    db.query(data, function(err, results) {
      if (err) throw err;
      console.log('Successfully executed schema.');
    });
  });


// inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'options',
//             message: 'What would you like to do?',
//             choices: ['View all departments','View all Roles', 'View all Employees','Add New Department','Add New Role','Add New Employee','Update an Employee']
//         }
//     ])