import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    })
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd()
    }

    const reactURL = 'https://github.com/AmoDinho/naboo/tree/master/packages/react-lib'
    const vueURL = 'https://github.com/AmoDinho/naboo/tree/master/packages/vue'

    const choice = options.template === 'VueJS' ? vueURL : reactURL

    const templateDir = path.resolve(
        new URL(import.meta.url).pathname,
        choice,
        options.template
    )

    options.templateDirectory = templateDir

    try {
        await access(templateDir, fs.constants.R_OK)
    } catch (e) {

        console.error('% invalid template name', chalk.red.bold('ERROR'))
        process.exit(1)
    }

    console.log('Copying project files')
    await copyTemplateFiles(options)

    console.log('Guess what? your project is ready', chalk.green.bold('DONE'))
    return true
}