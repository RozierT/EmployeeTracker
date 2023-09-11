const inquirer = require("inquirer");
const mysql = require('mysql2');

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

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do',
            choices: ['View all departments','View all Roles', 'View all Employees','Add New Department','Add New Role','Add New Employee','Update an Employee']
        }
    ])