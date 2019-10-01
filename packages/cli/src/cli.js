'use strict'
import arg from 'arg'
import inquirer from 'inquirer'
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

export function cli(args) {
    let options = parseArgumentsIntoOptions(args)
    options = await promptForMissingOptions(options)
    console.log(options)
}