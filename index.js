const inquirer = require("inquirer");
const fs = require("fs");

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do',
            choices: ['View all departments','View all Roles', 'View all Employees','Add New Department','Add New Role','Add New Employee','Update an Employee']
        }
    ])