const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 想要打包的模块
    entry: {
        vendor: ['vue-meditor']
    },
    output: {
        path: path.join(__dirname, './static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
        // vendor.dll.js中暴露出的全局变量名
        // 主要是给DLLPlugin中的name使用
        // 所以这里需要和webpack.DllPlugin中的'name:'[name]_library保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        // 压缩打包的文件，与该文章主线无关
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
