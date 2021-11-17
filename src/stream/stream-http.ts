import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

export default {

	getLivefeedAsImage(server, camera){

		return`${server}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	startLiveView(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/startLiveView/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopLiveView(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/stopLiveView/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLivefeedStatus(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/getLivefeedStatus/ByName/${camera.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLastShootErrorMessage(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/getLastShootErrorMessage/ByName/${camera.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cancelPending(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/cancelPending/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	shootAndWait(server, camera, file){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/shootAndWait/ByName/${camera.name}/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	writePictureStreamToFile(server, camera, file){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/writePictureStreamToFile/ByName/${camera.name}/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableFilestreamCount(server, camera){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/getAvailableFilestreamCount/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					let count = 0;

					count = Number.parseInt(response.data, 10);
					count = Number.isNaN(count) ? 0 : count;

					resolve(count);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	deleteFile(server, file){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/deleteFile/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getFile(server, file){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/getFile/${file.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOn(server, greenscreen){

		return new Promise((resolve, reject) => {

			axios
			.post(`${server}/greenscreen/on/`, qs.stringify({

				F: greenscreen.background,
				R: greenscreen.R,
				G: greenscreen.G,
				B: greenscreen.B,
				A: greenscreen.angle,
				N: greenscreen.noise

			}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOff(server){

		return new Promise((resolve, reject) => {

			axios
			.get(`${server}/greenscreen/off/`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	backgroundGreenScreenArray(server, files){

		return new Promise((resolve, reject) => {

			axios
			.post(`${server}/backgroundGreenScreenArray/`, qs.stringify({files}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	updateGreenscreen(server, file){

		return new Promise((resolve, reject) => {

			axios
			.post(`${server}/updateGreenscreen/`, qs.stringify({file}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};
