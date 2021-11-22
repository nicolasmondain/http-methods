import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

const streamHttpRecord: httpMethodsModule = {

	startRecording(camera: mediaStream, folder: string, file: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecording/ByName/`, qs.stringify({

				folder,
				filename: file.name

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

	startRecordingWithPicture(camera: mediaStream, folder: string, file: eventEngineMedia, preview: eventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecordingWithPicture/ByName/`, qs.stringify({

				folder,
				file   : file.name,
				preview: preview.name

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

	stopRecording(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopRecording/ByName/${camera.name}`)
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

	saveRecording(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/saveRecording/ByName/${camera.name}`)
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

export default streamHttpRecord;
