import inquirer from 'inquirer';
import * as fs from 'fs/promises';

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?',
        validate: input => input.trim() !== '' ? true : 'Title is required'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
        validate: input => input.trim() !== '' ? true : 'Description is required'
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'Enter installation instructions (opens in your default text editor):',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this project?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What command should be run to run tests?',
        default: 'npm test',
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: function(email) {
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            return valid ? true : 'Please enter a valid email address';
        }
    }
];

function generateMarkdown(answers) {
    return `# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## License
This project is licensed under the ${answers.license} license.

## Tests
To run tests, run the following command:
\`\`\`
${answers.tests}
\`\`\`

## Questions
If you have any questions, you can reach me at [${answers.email}](mailto:${answers.email}).
Find more of my work at [${answers.github}](https://github.com/${answers.github}/).
`;
}

async function init() {
    try {
        console.log('Welcome to the README Generator!');
        
        // Collect user input
        const answers = await inquirer.prompt(questions);
        
        // Generate markdown content
        const markdown = generateMarkdown(answers);
        
        // Write to README.md
        await fs.writeFile('README.md', markdown);
        
        console.log('Successfully created README.md!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Start the application
init(); 