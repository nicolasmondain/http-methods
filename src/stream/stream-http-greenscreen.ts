import {EventEngineGreenscreen, EventEngineStream} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const streamHttpGreenscreen: httpMethodsModule = {

	greenscreenOn(camera: EventEngineStream, greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/greenscreen/on/`, qs.stringify({

				F: greenscreen.background,
				R: greenscreen.R,
				G: greenscreen.G,
				B: greenscreen.B,
				A: greenscreen.angle,
				N: greenscreen.noise

			}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOff(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/greenscreen/off/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	backgroundGreenscreenArray(camera: EventEngineStream, files: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/backgroundGreenScreenArray/`, qs.stringify({files}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	updateGreenscreen(camera: EventEngineStream, file: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/updateGreenscreen/`, qs.stringify({file}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpGreenscreen;
