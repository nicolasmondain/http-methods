import {EventEngineStream} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpLiveview: httpMethodsModule = {

	startLiveView(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/startLiveView/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopLiveView(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopLiveView/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getLivefeedAsImage(camera: EventEngineStream): string{

		return`${camera.url}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	getLivefeedStatus(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLivefeedStatus/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpLiveview;
