import {Camera} from '../class/camera';
import {EventEngineMedia} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'STREAM';

const streamHttpRecord: httpMethodsModule = {

	setRecordingModeOn(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/setRecordingModeOn/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	setRecordingModeOff(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/setRecordingModeOff/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	setSlowmotion(camera: Camera, framerate: number): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/setSlowmotion/${framerate}/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	startRecording(camera: Camera, folder: string, file: EventEngineMedia, preview?: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecording/ByName/${camera.name}`, qs.stringify({

				folder,
				filename: file.name,
				preview : preview?.name || ''

			}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopRecording(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopRecording/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cleanRecording(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/cleanRecording/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, FORMAT_RESPONSE_SOURCE));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpRecord;
