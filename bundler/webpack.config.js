const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 載入 html-webpack-plugin (第一步)
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(glb|gltf)$/,
        use:
        [
            {
                loader: 'file-loader',
                options:
                {
                    outputPath: 'assets/models/'
                }
            }
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
    }),
    // 創建實例 (第二步)
    new HtmlWebpackPlugin({
      // 配置 HTML 模板路徑與生成名稱 (第三步)
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      // 配置 HTML 模板路徑與生成名稱 (第三步)
      template: './src/vegetable.html',
      filename: 'vegetable.html',
      chunks: ['vegetable']
    })
  ],
};