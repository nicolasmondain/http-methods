import {EventEngineStream} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpSettings: httpMethodsModule = {

	changeOrientation(camera: EventEngineStream, orientation: string): Promise<httpResponse>{

		const options = ['Default', 'Flip right', 'Flip left', 'Upside down'];

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/changeOrientation/${options.includes(orientation) ? orientation : options[0]}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableIso(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableIso/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				let iso = 0;

				iso = Number.parseInt(response.data, 10);
				iso = Number.isNaN(iso) ? 0 : iso;

				resolve(httpStatus.formatResponse(response.status, iso));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableWb(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableWb/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableTv(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableTv/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getFrameSizes(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFrameSizes/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpSettings;
