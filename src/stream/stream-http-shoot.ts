import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';

import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpShoot: httpMethodsModule = {

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

	stopMulticamAutoDownload(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopMulticamAutoDownload/ByName/${camera.name}`)
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

	}

	// getShootAsImage(){}

};

export default streamHttpShoot;
