const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: [path.resolve(__dirname, './src/main.ts')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname + '/src'),
    }
  },
  devServer: {
    inline:true,
    hot:true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 3000,
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
      ,{
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
      ,{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: "images/[name].[ext]",
          }
        }
      }
      ,{
        test: /\.(woff2?|eot|ttf|otf|)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'fonts/[name].[ext]'
          }
        }
      }
      ,{
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
            interpolate:true,
          }
        }],
      }
      ,{
        test: /\.js$/,
        use: 'babel-loader'
      }
      ,{
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: ['css-loader'],
                fallback: 'style-loader'
              })
            }
          }
        }
      }
      ,{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
  }
  ,plugins: [
    new CleanWebpackPlugin()
    ,new ManifestWebpackPlugin()
    ,new HtmlWebpackPlugin({
      filename:"index.html",
      template:"./src/index.html",
      favicon: path.resolve('favicon.ico')
    })
    ,new VueLoaderPlugin()
		// copy custom static assets
		,new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'static'),
				to: 'static',
				ignore: ['.*']
			}
		])
  ]
};
