const webpack=require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./app/index.js",
    devServer:{
        port:8081
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                // js 文件才使用 babel
                test: /\.js$/,
                // 使用哪个 loader
                use: 'babel-loader',
                // 不包括路径
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        // 配置 url-loader 的可选项
                        options: {
                            // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                            limit: 10000,
                            // 超出限制，创建的文件格式
                            // build/images/[图片名].[hash].[图片格式]
                            name: 'images/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }]
                })
            }
        ]
    },
    plugins:[
        //输出文件路径
        new ExtractTextPlugin("css/[name].[hash].css"),
        // 只删除 dist 文件夹下的 bundle 和 manifest 文件
        new CleanWebpackPlugin(['dist/bundle.*.js','dist/manifest.*.js'], {
            // 打印 log
            verbose: true,
            // 删除文件
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        // 生成全局变量
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // 压缩 JS 代码
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
        })

    ]
};