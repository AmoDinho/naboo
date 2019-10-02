'use strict'
import arg from 'arg'
import inquirer from 'inquirer'
//This fucntion allows us give the user arguments to use. 
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2),
        }
    )

    return {
        skipPropmpts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false
    }
}

//here we are getting the missing options 
//while asking them questions to choose
//their framework of choice
async function promptForMissingOptions(options) {
    const defaultTemplate = 'VueJS'
    if (options.skipPropmpts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        }
    }

    const questions = []
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Which framework would you like to use?',
            choices: ['VueJS', 'ReactJS'],
            default: defaultTemplate
        })
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repo?',
            default: false
        })
    }

    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git
    }
}

//this is an exported function that is triggered to do everything
export async function cli(args) {
    let options = parseArgumentsIntoOptions(args)
    options = await promptForMissingOptions(options)
    console.log(options)
}