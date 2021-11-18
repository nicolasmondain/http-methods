import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {greenScreen} from '../@types/event-engine/greenScreen';
import {httpMethodsModule} from '../@types/http-methods';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

const streamHttp: httpMethodsModule = {

	getLivefeedAsImage(camera: mediaStream): string{

		return`${camera.url}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	startLiveView(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/startLiveView/ByName/${camera.name}`)
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

	stopLiveView(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopLiveView/ByName/${camera.name}`)
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

	getLivefeedStatus(camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLivefeedStatus/ByName/${camera.name}`)
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

	getLastShootErrorMessage(camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLastShootErrorMessage/ByName/${camera.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cancelPending(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/cancelPending/ByName/${camera.name}`)
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

	shootAndWait(camera: mediaStream, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/shootAndWait/ByName/${camera.name}/${file.name}`)
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

	writePictureStreamToFile(camera: mediaStream, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/writePictureStreamToFile/ByName/${camera.name}/${file.name}`)
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

	getAvailableFilestreamCount(camera: mediaStream): Promise<number>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableFilestreamCount/ByName/${camera.name}`)
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

	deleteFile(camera: mediaStream, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/deleteFile/${file.name}`)
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

	getFile(camera: mediaStream, file: eventEngineMedia): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFile/${file.name}`)
			.then((response) => {

				resolve(response.data);

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOn(camera: mediaStream, greenscreen: greenScreen): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/greenscreen/on/`, qs.stringify({

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

	greenscreenOff(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/greenscreen/off/`)
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

	backgroundGreenScreenArray(camera: mediaStream, files: string): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/backgroundGreenScreenArray/`, qs.stringify({files}), CONFIG)
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

	updateGreenscreen(camera: mediaStream, file: string): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/updateGreenscreen/`, qs.stringify({file}), CONFIG)
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
