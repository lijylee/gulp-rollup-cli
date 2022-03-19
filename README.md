## yarn add gulp-rollup-cli

## gulp-rollup-cli myModuleName build

## package.json
```json
"scripts": {
    "build": "gulp-rollup-cli myModuleName build"
}
```
> yarn build

TODO: 如果需要babel 转化最新的API，则需要在生产依赖中安装@babel/runtime 及 @babel/runtime-corejs3，并修改rollup.config.js中plugins里的babel配置如下
``` javascript
        babel({
            exclude: '**/node_modules/**',
            babelHelpers: 'runtime',
            presets: ['@babel/preset-env'],
            plugins: [
                [
                    '@babel/plugin-transform-runtime',
                    {
                        "corejs": 3
                    }
                ]
            ]
        })
```

