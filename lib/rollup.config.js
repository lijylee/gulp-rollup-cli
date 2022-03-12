const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { uglify } = require('rollup-plugin-uglify')

let moduleName = '$gr'
exports.setModuleName = name => {
    moduleName = name
    exports.config = {
        inputOptions: {
            input: './src/index.js',
            plugins: [
                nodeResolve(),
                commonjs(),
                babel({
                    exclude: '**/node_modules/**',
                    babelHelpers: 'bundled',
                    presets: [require('@babel/preset-env')]
                }),
                uglify()
            ]
        },
        outputOptionsList: [
            {
                // sourcemap: true,
                file: 'dist/index.js',
                format: 'umd',
                name: moduleName
            },
            {
                // sourcemap: true,
                file: 'dist/index-web.js',
                format: 'iife',
                name: moduleName
            },
            {
                // sourcemap: true,
                file: 'dist/index-amd.js',
                format: 'amd'
            },
            {
                // sourcemap: true,
                file: 'dist/index-cjs.js',
                format: 'cjs'
            },
            {
                // sourcemap: true,
                file: 'dist/index-es.js',
                format: 'esm'
            }
        ]
    }
}
