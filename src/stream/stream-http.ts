import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {greenScreen} from '../@types/event-engine/greenScreen';
import {httpMethodsModule} from '../@types/http-methods';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

const streamHttp: httpMethodsModule = {

	getLivefeedAsImage(url: string, camera: mediaStream): string{

		return`${url}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	startLiveView(url: string, camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/startLiveView/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopLiveView(url: string, camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/stopLiveView/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLivefeedStatus(url: string, camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/getLivefeedStatus/ByName/${camera.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLastShootErrorMessage(url: string, camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/getLastShootErrorMessage/ByName/${camera.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cancelPending(url: string, camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/cancelPending/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	shootAndWait(url: string, camera: mediaStream, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/shootAndWait/ByName/${camera.name}/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	writePictureStreamToFile(url: string, camera: mediaStream, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/writePictureStreamToFile/ByName/${camera.name}/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableFilestreamCount(url: string, camera: mediaStream): Promise<number>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/getAvailableFilestreamCount/ByName/${camera.name}`)
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

	deleteFile(url: string, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/deleteFile/${file.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getFile(url: string, file: eventEngineMedia): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/getFile/${file.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOn(url: string, greenscreen: greenScreen): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${url}/greenscreen/on/`, qs.stringify({

				F: greenscreen.background,
				R: greenscreen.R,
				G: greenscreen.G,
				B: greenscreen.B,
				A: greenscreen.angle,
				N: greenscreen.noise

			}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOff(url: string): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/greenscreen/off/`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	backgroundGreenScreenArray(url: string, files: string): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${url}/backgroundGreenScreenArray/`, qs.stringify({files}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	updateGreenscreen(url: string, file: string): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${url}/updateGreenscreen/`, qs.stringify({file}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

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

export default streamHttp;
