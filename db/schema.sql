create DATABASE employee_tracker;

use employee_tracker;

create table departments(
    id int not null auto_increment,
    dept_name varchar(30) not null,
    primary key(id)
);

create table roles(
    id int not null auto_increment,
    title varchar(30) not null,
    salary decimal not null,
    dept_id int not null,
    primary key(id),
    foreign key(dept_id) references department(id)
);

create table employees(
    id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key(id),
    foreign key(role_id) REFERENCES role(id),
);