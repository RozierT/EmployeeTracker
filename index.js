const inquirer = require("inquirer");
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const express = require('express');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
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