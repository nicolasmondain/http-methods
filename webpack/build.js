
const webpack       = require('webpack'); // eslint-disable-line
const configuration = require('./webpack.common.js'); // eslint-disable-line

webpack(configuration, (error, stats) => {

	if(error){

		return error;

	}

	const jsonStats = stats.toJson();

	if(jsonStats.errorsCount){

		return jsonStats.errors.map((stat) => console.log(stat));

	}

	if(jsonStats.warningsCount){

		return jsonStats.warnings.map((stat) => console.log(stat));

	}

	return 0;

});
