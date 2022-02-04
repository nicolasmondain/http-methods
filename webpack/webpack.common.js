const path = require('path'); // eslint-disable-line

const configuration = {

	entry : [path.resolve(__dirname, '../src/index.ts')],
	mode  : 'production',
	target: 'web',
	output: {

		path          : path.resolve(__dirname, '../dist'),
		filename      : 'index.js',
		libraryTarget : 'umd',
		umdNamedDefine: true,
		globalObject  : 'this',
		library       : 'httpMethods'

	},
	module: {

		rules: [

			{

				test   : /\.ts$/u,
				exclude: /node_modules/u,
				include: path.resolve(__dirname, '../src'),
				use    : ['babel-loader', 'ts-loader']

			}

		]

	},
	resolve: {

    extensions: ['.tsx', '.ts', '.js']

  }

};

module.exports = configuration;
