import {greenScreen} from '../@types/event-engine/greenScreen';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import axiosConfig from '../mixins/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const streamHttpGreenscreen: httpMethodsModule = {

	greenscreenOn(camera: mediaStream, greenscreen: greenScreen): Promise<httpResponse>{

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

	greenscreenOff(camera: mediaStream): Promise<httpResponse>{

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

	backgroundGreenScreenArray(camera: mediaStream, files: string): Promise<httpResponse>{

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

	updateGreenscreen(camera: mediaStream, file: string): Promise<httpResponse>{

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
