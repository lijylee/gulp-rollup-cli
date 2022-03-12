const { src, dest, parallel, series, watch } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const rollup = require('rollup')

const rollupConfig = require('./rollup.config').config

const cwd = process.cwd()

// default config
let config = {
    src: 'src',
    dist: 'dist',
    paths: {
        styles: 'src/**/*.css'
    },
    inputOptions: {
        input: './src/index.js'
    }
}

try {
    const userConfig = require(`${cwd}/gr.config.js`)
    config = Object.assign({}, config, rollupConfig, userConfig)
} catch (error) {
    config = Object.assign({}, config, rollupConfig)
 }

const clean = function clean() {
    return del([config.dist])
}

const style = function style() {
    return src(config.paths.styles)
        .pipe(cleanCSS())
        .pipe(dest(config.dist))
}

async function buildScript() {
    let bundle;
    try {
        bundle = await rollup.rollup(config.inputOptions)
        await generateOutputs(bundle)
    } catch (error) {
        console.error(error)
    }
    if (bundle) {
        await bundle.close()
    }
}

async function generateOutputs(bundle) {
    for (const outputOptions of config.outputOptionsList) {
        await bundle.write(outputOptions)
    }
}

const build = series(clean, parallel(style, buildScript))

// watch(['src/**/*'], build)

module.exports = {
    build
}