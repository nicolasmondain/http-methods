import {greenScreen} from '../@types/event-engine/greenScreen';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

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

			}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(httpStatus.formatResponse(response.status, response.statusText, response.data));

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenscreenOff(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/greenscreen/off/`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(httpStatus.formatResponse(response.status, response.statusText, response.data));

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	backgroundGreenScreenArray(camera: mediaStream, files: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/backgroundGreenScreenArray/`, qs.stringify({files}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(httpStatus.formatResponse(response.status, response.statusText, response.data));

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	updateGreenscreen(camera: mediaStream, file: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/updateGreenscreen/`, qs.stringify({file}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(httpStatus.formatResponse(response.status, response.statusText, response.data));

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpGreenscreen;
