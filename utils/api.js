const inquirer = require("inquirer");
const axios = require("axios");

const api = {
    getUser(username) {
        inquirer
            .prompt({
                message: "Type your user GitHub username here?",
                name: "username"
            })

            // Get the GitHub UserName Details from the source
            .then(({ username }) => {
                const queryUrl = `https://api.github.com/users/${username}`;

                // Get the GitHub avatar image
                axios.get(queryUrl).then((res) => {
                    const avatarURL = res.data.avatar_url;
                    console.log(avatarURL);
                });
            });
    }
};

module.exports = api;