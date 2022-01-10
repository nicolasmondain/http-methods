import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import axiosConfig from '../mixins/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpShoot: httpMethodsModule = {

	shootAndWait(camera: mediaStream, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/shootAndWait/ByName/${camera.name}/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLastShootErrorMessage(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLastShootErrorMessage/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cancelPending(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/cancelPending/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	writePictureStreamToFile(camera: mediaStream, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/writePictureStreamToFile/ByName/${camera.name}/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableFilestreamCount(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableFilestreamCount/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				let count = 0;

				count = Number.parseInt(response.data, 10);
				count = Number.isNaN(count) ? 0 : count;

				resolve(httpStatus.formatResponse(response.status, count));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	deleteFile(camera: mediaStream, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/deleteFile/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getFile(camera: mediaStream, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFile/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpShoot;
