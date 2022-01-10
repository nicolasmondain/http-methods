import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import axiosConfig from '../mixins/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const streamHttpRecord: httpMethodsModule = {

	startRecording(camera: mediaStream, folder: string, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecording/ByName/`, qs.stringify({

				folder,
				filename: file.name

			}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	startRecordingWithPicture(camera: mediaStream, folder: string, file: eventEngineMedia, preview: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecordingWithPicture/ByName/`, qs.stringify({

				folder,
				file   : file.name,
				preview: preview.name

			}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopRecording(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopRecording/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	cleanRecording(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/cleanRecording/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default streamHttpRecord;
