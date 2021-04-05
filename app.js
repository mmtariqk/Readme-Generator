
/**
 * Main file named as app.js
 * Run Node app.js 
 * require File System module
 * require inquirer - To prompt questions to user for their inputs
 * 
 */

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { ifAnsAddText, addTableOfContents, ifAnsBasicsAdd, getLicText, getLicBadge, addRBadges } = require("./helpers/helpers.js");

// Questions to ask the README generator user
const questions = [

    // Basic Questions
    {
        name: "title",
        type: "input",
        message: chalk.yellow("What is your project's title?")
    },
        
    {
        name: "title",
        type: "input",
        message: chalk.yellow("What is the author's name?")
    },
    
    {
        name: "description",
        type: "input",
        message: chalk.yellow("Please write a brief description of your project?")
    },

    {
        name: "githubUsername", 
        type: "input",
        message: chalk.yellow("What is Your Github username if any (Will create repository link):")
    },
    {
        name: "email",
        type: "input",
        message: chalk.yellow("What's Your email address to be reached if any:")
    },
    {
        name: "hireLink",
        type: "input",
        message: chalk.yellow("LinkedIn, portfolio, or hiring link if any:")
    },

    // ReadMe Sections
    {
        name: "badges",
        type: "input",
        message: chalk.yellow("If any, enter BADGE / BADGES code (markdown or html) for stats, showcasing other works, portfolio, and funding links (shields.io for more info):")
    },
    
    {
        name: "demo",
        type: "input",
        message: chalk.yellow("If any, enter LIVE DEMO code, eg. [link](https://www...). May type a placeholder text for later:")
    },
    {
        name: "video",
        type: "input",
        message: chalk.yellow("If any, enter VIDEO code, eg. [link](https://www...). May type a placeholder text for later, such as a coming soon display:\n\tComing soon! <!--Watch [walkthrough!](https://youtu.be/watch?v=NpEaa2P7qZI)-->\n\?:")
    },
    {
        name: "screenshot",
        type: "input",
        message: chalk.yellow("If any, enter SCREENSHOT code, eg. ![screenshot](https://www...). May type a placeholder text for later:")
    },
    {
        name: "installation",
        type: "input",
        message: chalk.yellow.italic("Enter installation instructions if any:")
    },
    {
        name: "usage",
        type: "input",
        message: chalk.yellow.italic("Enter usage information if any:")
    },

    // License question
    // Is in multiple choice format. There is a separator
    {
        name: "license",
        choices: [
            new inquirer.Separator(),
            "-- Skip --",
            new inquirer.Separator(),
            "apache2", "bsd2", "bsd3",
            new inquirer.Separator(),
            "cc1", "cc4-international", "cc4-sharealike",
            new inquirer.Separator(),
            "EPL1", "GNU GPLv2", "GNU GPLv3",
            new inquirer.Separator(),
            "MIT", "Unlicense"
        ],
        type: 'list'
    },
    {
        name: "contribution",
        type: "input",
        message: chalk.green.italic("Enter contribution guidelines if any:")
    },
    {
        name: "tests",
        type: "input",
        message: chalk.green.italic("Enter test instructions if any:")
    }
];

// Here will have the answers
global.answers = {};

/**
 * 
 * @callback function
 * Handles the answers after user responds to questions
 * The result is a generated read me file called "Generated-README.md"
 *  
 */
const generateReadMe = answers => {

    // Make answers accessible at this level
    let {
        title,
        githubUsername,
        email,
        hireLink,
        badges,
        description,
        demo,
        video,
        screenshot,
        installation,
        usage,
        license,
        contribution,
        tests

    } = answers;

    // If license is chosen skipped, make license falsy:
    if (license === "-- Skip --") {
        license = null;
        answers.license = null;
    }

    // Make answers accessible at the global scope so that helper functions can concatenate to the ReadMe text
    global.answers = answers;

    // Concatenate ReadMe text based on answers or lack of
    let text = "";
    text += ifAnsAddText(title, title + "\n====\n");
    text += addRBadges(license, badges);
    text += ifAnsAddText(description, "Description\n---\n" + description + "\n\n");
    text += ifAnsAddText(demo, "Demo\n---\n" + demo + "\n\n");
    text += ifAnsAddText(video, "Video Walkthrough\n---\n" + video + "\n\n");
    text += ifAnsAddText(screenshot, "Screenshot\n---\n" + screenshot + "\n\n");
    text += addTableOfContents();
    text += ifAnsAddText(installation, "Installation\n---\n" + installation + "\n\n");
    text += ifAnsAddText(usage, "Usage\n---\n" + usage + "\n\n");
    text += ifAnsAddText(license, "License\n---\n" + getLicText(license) + "\n\n");
    text += ifAnsAddText(contribution, "Contribution\n---\n" + contribution + "\n\n");
    text += ifAnsAddText(tests, "Tests\n---\n" + tests + "\n\n");
    text += ifAnsBasicsAdd(githubUsername, email, hireLink);

    // Replace multiple blank lines in generated ReadMe text from skipped questions
    // text = text.replace(/\n\n\n/gm, "\n");

    // If all questions skipped
    if (text.length === 0) {
        console.error("\n\nError: You skipped all questions, so there's no readme to generate.");
        process.exit(0);
    }

    // Generate ReadMe file & write it in a file by using fs.writeFileSync(filename, text);
    const filename = "Generated-README.md";
    fs.writeFileSync(filename, text);

    // Show ReadMe text generated in Node JS output
    console.group("README Generator");
    console.log(`Generating:\n\n${text}\nFinished.\n\nThe above README generated and written to:\n` + path.join(__dirname, filename) + "\n\n");
    console.groupEnd();

};

const catchError = err => {
    console.log("Error: ", err);
}

// Use Inquirer API that takes your questions, a callback to handle the questions, and a callback to handle errors
inquirer
    .prompt(questions)
    .then(generateReadMe)
    .catch(catchError);