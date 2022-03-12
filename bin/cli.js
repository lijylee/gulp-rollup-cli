#!/usr/bin/env node
const { setModuleName } = require('../lib/rollup.config');

if (process.argv.length > 2 && process.argv[2] !== 'build') {
    setModuleName(process.argv[2])
    process.argv.splice(2, 1)
} else {
    setModuleName('$gr')
}

process.argv.push('--cwd')
process.argv.push(process.cwd())
process.argv.push('--gulpfile')
process.argv.push(require.resolve('..'))

require('gulp/bin/gulp')