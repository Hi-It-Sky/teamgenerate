const jest = require('jest');
const inquirer = require('inquirer');
var express = require("express");
var exphbs = require("express-handlebars");
var path=require("path");
const fs = require('fs');

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" ,partialsDir: [path.join(__dirname,'views/partials')]}));
exphbs.partialsDir=[path.join(__dirname,'views/partials')];
console.log(exphbs.partialsDir);
app.set("view engine", "handlebars");

var outputfile=path.join(__dirname,'output/team.html')

// * name
// * id
// * title
// * getName()
// * getId()
// * getEmail()
// * getRole()

class Employee {
    constructor(name, id, title, email) {
        this.role = "Employee";
        this.name = name;
        this.id = id;
        this.title = title;
        this.email = email;
    }
    getRole() {
        return this.role;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getEmail() {
        return this.email;
    }
};

//`Manager`, `Engineer`,`Intern`

class Manager extends Employee {
    constructor(name, id, title, email, officeNumber) {
        super(name, id, title, email);
        this.role = "Manager";
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber
    }
};

class Engineer extends Employee {
    constructor(name, id, title, email, gitHub) {
        super(name, id, title, email);
        this.role = "Engineer";
        this.gitHub = gitHub;
    }
    getGitHub() {
        return this.gitHub;
    }
};

class Intern extends Employee {
    constructor(name, id, title, email, school) {
        super(name, id, title, email);
        this.role = "Intern";
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
};

var employees={};
employees.managers = [];
employees.engineers = [];
employees.interns = [];

getNext();

function getNext(){
inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'choice',
            message: 'Select an action',
            choices: ['Add a manager', 'Add an engineer', 'Add an intern', 'Generate HTML', 'Quit'],
        }
    ])
    .then(answers => {
        console.log('Answer: ', answers)
        switch (answers.choice) {
            case 'Add a manager':
             inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'enter your name: '
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'enter your id: '
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'enter your title: '
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'enter your email: '
                    },
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'enter your office number: '
                    }
                ]).then(answers => {
                    employees.managers.push(new Manager (answers.name, answers.id, answers.title, answers.email, answers.officeNumber));
                    console.log('Name: ', answers.name);
                    console.log(employees);
                    getNext();
                })
                break;
            case 'Add an engineer':
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'enter your name: '
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'enter your id: '
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'enter your title: '
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'enter your email: '
                    },
                    {
                        type: 'input',
                        name: 'gitHub',
                        message: 'enter your gitHub username: '
                    }
                ]).then(answers => {
                    employees.engineers.push(new Engineer (answers.name, answers.id, answers.title, answers.email, answers.gitHub));
                    console.log('Name: ', answers.name);
                    console.log(employees);
                    getNext();
                })
                break;
            case 'Add an intern':
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'enter your name: '
                    },
                    {
                        type: 'input',
                        name: 'id',
                        message: 'enter your id: '
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'enter your title: '
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'enter your email: '
                    },
                    {
                        type: 'input',
                        name: 'school',
                        message: 'enter your school: '
                    }
                ]).then(answers => {
                    employees.interns.push(new Intern (answers.name, answers.id, answers.title, answers.email, answers.school));
                    console.log('Name: ', answers.name);
                    console.log(employees);
                    getNext();
                })
                break;
            case 'Generate HTML':
                // output = '';
                // employees.forEach(employee => {
                //     switch(employee.getRole()){
                //         case 'Manager': 
                //         break;
                //         case 'Engineer':
                //         break;
                //         case 'Intern':
                //         break;
                //     }
                // });
                console.log(employees);
                app.render('main',employees, function(err, html){
                    console.log(html);
                    if(err){
                      console.log(err);
                    }
                    else{
                        fs.writeFile(outputfile, html, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("saved!");
                        })
                    }
                });
                break;
            case 'Quit':
                break;
        }
    });
};