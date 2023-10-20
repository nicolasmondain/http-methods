import {Camera} from '../class/camera';
import {EventEngineGreenscreen, EventEngineMedia} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'STREAM';
const SERVICE_UNAVAILABLE    = 503;

const streamHttpGreenscreen: httpMethodsModule = {

	greenscreenOn(camera: Camera, greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/greenscreen/on/`, qs.stringify({

				F           : greenscreen.background,
				R           : greenscreen.R,
				G           : greenscreen.G,
				B           : greenscreen.B,
				A           : greenscreen.angle,
				N           : greenscreen.noise,
				livefeedOnly: greenscreen.livefeedOnly

			}), axiosConfig)
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

	greenscreenOff(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/greenscreen/off/`, axiosConfig)
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

	backgroundGreenscreenArray(camera: Camera, backgrounds: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/backgroundGreenScreenArray/`, qs.stringify({backgrounds}), axiosConfig)
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

	updateGreenscreen(camera: Camera, background: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/updateGreenscreen/`, qs.stringify({background}), axiosConfig)
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

	applyGreenscreen(camera: Camera, background: string, source: EventEngineMedia, destination?: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/applyGreenscreen/`, qs.stringify({

				background,
				source     : source.path,
				destination: destination?.path || ''

			}), axiosConfig)
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

export default streamHttpGreenscreen;
