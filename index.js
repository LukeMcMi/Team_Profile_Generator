const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/classes/Engineer");
const Intern = require("./lib/classes/Intern");
const Manager = require("./lib/classes/Manager");

const teamMembers = [];
let manager;

function initApp() {
    renderEmployee();
    managerData();
};

function managerData() {
    inquirer.prompt([
        {  
            type: "input",
            message: "Please enter Managers name",
            name: "managerName"
        },
        { 
            type: "input",
            message: "Please enter Manager's ID",
            name: "managerID"
        },
        { 
            type: "input",
            message: "Please enter Manager's email",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Please enter Manager's office number",
            name: "officeNumber"
        }]).then(managerAnswers => {
            manager = new Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.officeNumber);
            console.log("Please have employee information ready")
            lesserEmployeeData();
        });
}

function lesserEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "Please enter employee name ",
            name: "employeeName"
        },
        {
            type: "input",
            message: "Please enter employee id",
            name: "employeeId"
        },
        {
            type: "input",
            message: "Please enter employee email",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "Github of Engineer",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "Intern's School",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another employee?" 
        }
    ]).then(answers => {
        if (answers.employeeRole === "Intern") {
            const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
            teamMembers.push(employee);
        } else if (answers.employeeRole === "Engineer") {
            teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
        }
        if (answers.newEmployee === true) {
            lesserEmployeeData();
        } else {
            var main = fs.readFileSync('./src/main.html', 'utf8');
        
            var managerCard = fs.readFileSync('./src/manager.html', 'utf8');
            managerCard = managerCard.replace('{{ name }}', manager.getName());
            managerCard = managerCard.replace('{{ role }}', manager.getRole());
            managerCard = managerCard.replace('{{ id }}', manager.getId());
            managerCard = managerCard.replace('{{ email }}', manager.getEmail());
            managerCard = managerCard.replace('{{ address }}', manager.getEmail());
            managerCard = managerCard.replace('{{ officeNumber }}', manager.getOfficeNumber());

            var cards = managerCard; 
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                cards += renderEmployee(employee);
            }
            main = main.replace('{{ cards }}', cards);

            fs.writeFileSync('./dist/team.html', main);
        }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./src/intern.html', 'utf8');
        internCard = internCard.replace('{{ name }}', employee.getName());
        internCard = internCard.replace('{{ role }}', employee.getRole());
        internCard = internCard.replace('{{ id }}', employee.getId());
        internCard = internCard.replace('{{ email }}', employee.getEmail());
        internCard = internCard.replace('{{ address }}', employee.getEmail());
        internCard = internCard.replace('{{ school }}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./src/engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{ name }}', employee.getName());
        engineerCard = engineerCard.replace('{{ role }}', employee.getRole());
        engineerCard = engineerCard.replace('{{ id }}', employee.getId());
        engineerCard = engineerCard.replace('{{ email }}', employee.getEmail());
        engineerCard = engineerCard.replace('{{ address }}', employee.getEmail());
        engineerCard = engineerCard.replace('{{ github }}', employee.getGithub());
        engineerCard = engineerCard.replace('{{ githubID }}', employee.getGithub());
        return engineerCard;
    }
}

managerData();