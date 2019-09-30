'use strict'

const program = require('commander')

program
    .command('naboo create')
    .option('-r, --react')
    .option('-v, --vue')


program.parse(process.argv)
if (program.react) console.log('install react lib')
if (program.vue) console.log('install vue lib')