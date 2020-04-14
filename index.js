const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

async function asyncCall(){
    console.log(`calling`)
    const userResponse = await inquirer.prompt([
        {
            type:"input",
            message:"What is your github username?",
            default:"joshb4u",
            name:"username"
        },
        {
            type:"input",
            message:"What is the title of your project?",
            default:"Sample Project 1",
            name:"projectTitle"
        },
        {
            type:"input",
            message:"Give a brief description of your project.",
            default:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            name:"description"
        },
        {
            type:"input",
            message:"What are the commands required to install your project?",
            default:"npm install",
            name:"installation"
        },
        {
            type:"input",
            message:"Provide usage details.",
            default:"git clone",
            name:"usage"
        },
        {
            type:"list",
            message:"What license are you using?",
            choices:["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"],
            name:"licenseName"
        },
        {
            type:"input",
            message:"Provide your license URL.",
            default:"https://opensource.org/licenses/MIT",
            name:"licenseURL"
        },
        {
            type:"input",
            message:"Enter the NAMES of any contributors for this repo:",
            name:"contributorsName"
        },
        {
            type:"input",
            message:"Provide the GITHUB USERNAMES of the contributors:",
            name:"contributorGitUsername"
        },
        {
            type:"input",
            message:"What method is required for testing?",
            default:"npm test",
            name:"tests"
        }
    ]);
    console.log(`calling`);
    console.log(userResponse);
    const gitUserName = userResponse.username;
    const projectTitle = userResponse.projectTitle;
    const projectDescription = userResponse.description;
    const installationProcess = userResponse.installation;
    const usage = userResponse.usage;
    const licenseName= userResponse.licenseName;
    const licenseURL = userResponse.licenseURL;
    const contributorsName = userResponse.contributorsName;
    const tests = userResponse.tests;
    const gitResponse = await axios.get(`https://api.github.com/users/${gitUserName}`);
    const gitData = gitResponse.data;
    console.log(gitData)

      //converting contributors section into an array
      let contributorGitName = userResponse.contributorGitUsername.split(",");
      console.log(contributorGitName);
      
      let info = "";
      for (let i = 0; i < contributorGitName.length; i++){   
          console.log(contributorGitName[i]);
          let contriInfo = await axios.get(`https://api.github.com/users/${contributorGitName[i]}`);
          let contributorProfile = contriInfo.data.avatar_url;
          let contributorURL = contriInfo.data.html_url;
          info = info + `\n[![ProfilePicture](${contributorProfile})](${contributorURL})`
      }
      console.log(info);

let result = (`
# ${projectTitle}
![Code Size](https://img.shields.io/github/languages/code-size/joshb4u/Hw9)
![Repo Size](https://img.shields.io/github/repo-size/joshb4u/Hw9)
![languages](https://img.shields.io/github/languages/top/joshb4u/Hw9)
![last commit](https://img.shields.io/github/last-commit/joshb4u/Hw9)

\n ${projectDescription}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

\n## Installation
\`\`\`
${installationProcess}
\`\`\`

\n## Usage
\`\`\`
${usage}
\`\`\`

\n## License
This project is licensed under the ${licenseName} 
\n[![license](https://img.shields.io/npm/l/license)](${licenseURL})

\n## Contributing
${info}
\n${contributorsName}

\n## Tests
\`\`\`
${tests}
\`\`\`

\n## Questions
\n Please contact ${gitData.name} (Author)

\n![ProfilePicture](${gitData.avatar_url})
\nGithub Email: "hidden"

`)
fs.writeFileSync( 'Readme.md',result )
console.log("file generated...")
}
asyncCall();
//Email showing null when retrieving from github API using ${gitData.email}.