
const fs = require("fs");
const inquirer = require("inquirer");
const generateMD = require("./utils/generateMarkdown");

// Getting input from user here. See below
const queryQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please, type your GitHub username?",
            name: "username",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log("Please enter username!");
                  return false;
                }
              }
            },  
        
        {
            type: "input",
            message: "Please, type your e-mail address?",
            name: "email",
            
            validate: emailInput => {
              var regextest = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                  if (regextest.test (emailInput)) {
                  return true;
                } else {
                  console.log(" Please enter your correct e-mail address!");
                  return false;
                }
              }
        },

        {
            type: "input",
            message: "Please, type the URL of your project repository in GitHub?",
            name: "url",
            validate: githubInput => {
                if (githubInput) {
                  return true;
                } else {
                  console.log("Please enter your project repository in GitHub!");
                  return false;
                }
              }
        },
        {
            type: "input",
            message: "Please, type your project title?",
            name: "title",
            validate: titleInput => {
                if (titleInput) {
                  return true;
                } else {
                  console.log('You need to enter a project title!');
                  return false;
                }
              }
        },

        {
            type: "input",
            message: "Please provide a description of your project.",
            name: "description",
            validate: descriptionInput => {
                if (descriptionInput) {
                  return true;
                } else {
                  console.log('You need to enter a project description!');
                  return false;
                }
              }
        },

        {
            type: "input",
            message: "What NPM packages need to be installed to run the project.",
            name: "installation"
        },
        {
            type: "input",
            message: "What technologies were used to create this project.",
            name: "technology"
        },
        {
            type: "input",
            message: "Please give an example of how the project can be used.",
            name: "usage"
        },
        {
            type: "list",
            name: "license",
            message: "Please, Select License Type from the following choices?",
            name: "license",
            choices: ["ISC", "MIT", "Perl"]
        },
        {
            type: "input",
            message: "Please list out all contributors on project, including yourself",
            name: "contributor"
        },
        {
            type: "input",
            message: "What command is used in CLI to run a test",
            name: "tests",
        }
    ]);
}

function WriteToFile(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Successfully generated your README.md file inside dist folder");
    });
}

 const init = async () => {
    try {
        const answers = await queryQuestions();
        generateMD(answers);
        WriteToFile("./dist/generatedREADME.md", generateMD(answers));

    } catch (err) {
        console.log(err);
    }
}

init();