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
            message:"Enter the NAMES of any contributors for this repo.",
            default:"None",
            name:"contributorsName"
        },
        {
            type:"input",
            message:"Provide the GITHUB USERNAME of the contributors.",
            default:"None",
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
\n ${projectDescription}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributors](#Contributors)
* [Tests](#Tests)
* [License](#License)
* [Author](#Author)

\n## Installation
\`\`\`
${installationProcess}
\`\`\`

\n## Usage
\`\`\`
${usage}
\`\`\`

\n## Contributors
${info}
\n${contributorsName}


\n## Tests
\`\`\`
\n${tests}
\`\`\`


\n## License
This project is licensed under the ${licenseName} 
\n[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](${licenseURL})

\n## Author
\n${gitData.name}

\n![ProfilePicture](${gitData.avatar_url})
\nGithub Email: "hidden"
\nGithub Repos URL: ${gitData.repos_url}

`)
fs.writeFileSync( 'Readme.md',result )
console.log("file generated...")
}
asyncCall();
//Included one LICENSE badge (MIT) herewith