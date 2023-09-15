//declare dependencies
const inquirer = require("inquirer");
const mysql = require('mysql2');


//connect to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ppp111',
      database: 'employee_tracker'
    },
  );

  db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_tracker database`)
    start();
});

//use inquirer to ask user what they'd like to do
function start(){
inquirer
    .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add new department',
              'Add new role',
              'Add new employee',
              'Update an employee'
              ],
}) 
    //launch function based on user choice
    .then((answer) => {
      switch (answer.options) {
        case "View all departments":
          viewAllDepartments();
          break;
      case "View all roles":
          viewAllRoles();
          break;
      case "View all employees":
          viewAllEmployees();
          break;
      case "Add new department":
          addDepartment();
          break;
      case "Add a new role":
          addRole();
          break;
      case "Add a new employee":
          addEmployee();
          break;
      case "Update an employee":
          updateEmployeeRole();
          break;
      }
    });
  }

  //create functions for each possible choice
  // function to view all departments
function viewAllDepartments() {
  const query = "SELECT * FROM departments";
  db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
  });
}

// function to view all roles
function viewAllRoles() {
  const query = "SELECT roles.title, roles.id, departments.dept_name, roles.salary from roles join departments on roles.dept_id = departments.id";
  db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
  });
}

// function to view all employees
function viewAllEmployees() {
  const query = `
  SELECT * FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN departments ON roles.dept_id = departments.id
  LEFT JOIN employees ON employees.manager_id = employees.id;
  `;
  db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
  });
}

// function to add a department
function addDepartment() {
  inquirer
      .prompt({
          type: "input",
          name: "name",
          message: "Enter the name of the new department:",
      })
      .then((answer) => {
          const query = `INSERT INTO departments (dept_name) VALUES ("${answer.name}")`;
          db.query(query, (err, res) => {
              if (err) throw err;
              start();
              console.log(answer.name);
          });
      });
}
//function to add a role
function addRole() {
  const query = "SELECT * FROM departments";
  db.query(query, (err, res) => {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  type: "input",
                  name: "title",
                  message: "Enter the title of the new role:",
              },
              {
                  type: "input",
                  name: "salary",
                  message: "Enter the salary of the new role:",
              },
              {
                  type: "list",
                  name: "department",
                  message: "Select the department for the new role:",
                  choices: res.map(
                      (departments) => departments.dept_name
                  ),
              },
          ])
          .then((answers) => {
              const department = res.find(
                  (department) => department.name === answers.department
              );
              const query = "INSERT INTO roles SET ?";
              db.query(
                  query,
                  {
                      title: answers.title,
                      salary: answers.salary,
                      dept_id: department,
                  },
                  (err, res) => {
                      if (err) throw err;
                      start();
                  }
              );
          });
  });
}

// Function to add an employee
function addEmployee() {
  db.query("SELECT id, title FROM roles", (error, results) => {
      if (error) {
          console.error(error);
          return;
      }

      const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
      }));

 // Retrieve list of employees from the database to use as managers
      db.query(
          'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
          (error, results) => {
              if (error) {
                  console.error(error);
                  return;
              }
              const managers = results.map(({ id, name }) => ({
                name,
                value: id,
            }));
              inquirer
                  .prompt([
                      {
                          type: "input",
                          name: "firstName",
                          message: "Enter the employee's first name:",
                      },
                      {
                          type: "input",
                          name: "lastName",
                          message: "Enter the employee's last name:",
                      },
                      {
                          type: "list",
                          name: "roleId",
                          message: "Select the employee role:",
                          choices: roles,
                      },
                      {
                          type: "list",
                          name: "managerId",
                          message: "Select the employee manager:",
                          choices: [
                              { name: "None", value: null },
                              ...managers,
                          ],
                      },
                  ])
                  .then((answers) => {
                      // Insert the employee into the database
                      const sql =
                          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                      const values = [
                          answers.firstName,
                          answers.lastName,
                          answers.roleId,
                          answers.managerId,
                      ];
                      db.query(sql, values, (error) => {
                          if (error) {
                              console.error(error);
                              return;
                          }
                          console.log("Employee added successfully");
                          start();
                      });
                  })
                  .catch((error) => {
                      console.error(error);
                  });
          }
      );
  });
}
// function to update an employee
function updateEmployeeRole() {
  const queryEmployees =
  "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
const queryRoles = "SELECT * FROM roles";
db.query(queryEmployees, (err, resEmployees) => {
  if (err) throw err;
  db.query(queryRoles, (err, resRoles) => {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  type: "list",
                  name: "employee",
                  message: "Select the employee to update:",
                  choices: resEmployees.map(
                      (employee) =>
                          `${employee.first_name} ${employee.last_name}`
                  ),
              },
              {
                  type: "list",
                  name: "role",
                  message: "Select the new role:",
                  choices: resRoles.map((role) => role.title),
              },
          ])
          .then((answers) => {
              const employee = resEmployees.find(
                  (employee) =>
                      `${employee.first_name} ${employee.last_name}` ===
                      answers.employee
              );
              const role = resRoles.find(
                  (role) => role.title === answers.role
              );
              const query =
                  "UPDATE employee SET role_id = ? WHERE id = ?";
              db.query(
                  query,
                  [role.id, employee.id],
                  (err, res) => {
                      if (err) throw err;
                      start();
                  }
              );
          });
  });
});
}
