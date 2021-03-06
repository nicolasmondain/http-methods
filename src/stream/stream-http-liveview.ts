import {Camera} from '../class/camera';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const FORMAT_RESPONSE_SOURCE = 'STREAM';
const SERVICE_UNAVAILABLE    = 503;

const streamHttpLiveview: httpMethodsModule = {

	startLiveView(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/startLiveView/ByName/${camera.name}`, axiosConfig)
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

	stopLiveView(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopLiveView/ByName/${camera.name}`, axiosConfig)
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

	getLivefeedAsImage(camera: Camera): string{

		return`${camera.url}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	getLivefeedStatus(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLivefeedStatus/ByName/${camera.name}`, axiosConfig)
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

export default streamHttpLiveview;
