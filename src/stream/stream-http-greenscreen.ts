import {Camera} from '../class/camera';
import {EventEngineGreenscreen} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'STREAM';

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

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOff(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/greenscreen/off/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	backgroundGreenscreenArray(camera: Camera, files: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/backgroundGreenScreenArray/`, qs.stringify({files}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	updateGreenscreen(camera: Camera, file: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/updateGreenscreen/`, qs.stringify({file}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpGreenscreen;
