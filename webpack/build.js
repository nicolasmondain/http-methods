
const webpack       = require('webpack');
const configuration = require('./webpack.common.js');

webpack(configuration, (error, stats) => {

	if(error){

		return 1;

	}

	const jsonStats = stats.toJson();

	if(jsonStats.errorsCount){

		console.log('Webpack generated the following errors:');
		return jsonStats.errors.map((stat) => console.log(stat));

	}

	if(jsonStats.warningsCount){

		console.log('Webpack generated the following warnings:');
		return jsonStats.warnings.map((stat) => console.log(stat));

	}

	console.log(`Your app has been built for ${process.env.TARGET}`);

	return 0;

});
