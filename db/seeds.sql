INSERT INTO departments (dept_name)
VALUES ("Admin"),
       ("Sales"),
       ("Service");

INSERT INTO roles (title, salary, dept_id)
VALUES ("General Manager", 150000, 1),
       ("Sales Manager", 120000, 2),
       ("Sales Rep", 90000, 2),
       ("Service Manager", 110000, 3),
       ("Service Rep", 80000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom","Cruise", 1),
       ("Michael","Cera",2,1),
       ("Seth","Rogan",3,2),
       ("James","Franco",3,2),
       ("Nick","Jonas",4,1),
       ("Randy","Savage",5,5),
       ("Jonah","Hill",5,5);