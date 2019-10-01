'use strict'

const program = require('commander')
exports.cli = () => {

    program
        .option('-r, --react')
        .option('-v, --vue')

    program.parse(process.argv)

    if (program.react) program.action(console.log('install react lib'))
    if (program.vue) program.action(console.log('install vue lib'))


}
