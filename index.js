const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/classes/Engineer");
const Intern = require("./lib/classes/Intern");
const Manager = require("./lib/classes/Manager");

const employees = [];

function initApp() {
    startHTML();
    addMember();
};

function addMember () {
    inquirer.prompt([
    {    
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"    
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "github";
        } else if (role === "Intern") {
            roleInfo = "school";
        } else {
            roleInfo = "officeNumber";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"    
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function(){
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml()
                }
            });
        });
    });
};

// render HTML

// function startHTML() {
//     const mainHTML = require("./src/main.html");
//     fs.writeFile("./dist/team.html", html, function(err) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     console.log("start");
// }

            var main = fs.readFileSync('./src/main.html', 'utf8');
           

            // main = main.replace(/{{teamTitle}}/g, teamTitle);

            // Loops through employees and prints their cards
            var managerCard = fs.readFileSync('./src/manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', employee.getName());
            managerCard = managerCard.replace('{{role}}', employee.getRole());
            managerCard = managerCard.replace('{{id}}', employee.getId());
            managerCard = managerCard.replace('{{email}}', employee.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', employee.getOfficeNumber());


            // After manager append team members 

            var cards = managerCard; 
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                cards += renderEmployee(employee);
            }

            // Outputs to team.html.
            // Cards to main.html
            
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('./dist/team.html', main);





// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./src/intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./src/engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

initApp();