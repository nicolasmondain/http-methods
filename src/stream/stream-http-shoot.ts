import {Camera} from '../class/camera';
import {EventEngineMedia} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const FORMAT_RESPONSE_SOURCE = 'STREAM';
const SERVICE_UNAVAILABLE    = 503;

const streamHttpShoot: httpMethodsModule = {

	shootAndWait(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/shootAndWait/ByName/${camera.name}/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	getLastShootErrorMessage(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLastShootErrorMessage/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	cancelPending(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/cancelPending/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	writePictureStreamToFile(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/writePictureStreamToFile/ByName/${camera.name}/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	getAvailableFilestreamCount(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableFilestreamCount/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				let count = 0;

				count = Number.parseInt(response.data, 10);
				count = Number.isNaN(count) ? 0 : count;

				resolve(httpStatus.formatResponse(response.status, count, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	deleteFile(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/deleteFile/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	},

	getFile(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFile/${file.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	}

};

export default streamHttpShoot;
