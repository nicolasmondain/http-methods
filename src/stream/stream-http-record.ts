import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG = {headers: {'content-type': 'application/x-www-form-urlencoded'}};

const streamHttpRecord: httpMethodsModule = {

	startRecording(camera: mediaStream, folder: string, file: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecording/ByName/`, qs.stringify({

				folder,
				filename: file.name

			}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	startRecordingWithPicture(camera: mediaStream, folder: string, file: eventEngineMedia, preview: eventEngineMedia): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/startRecordingWithPicture/ByName/`, qs.stringify({

				folder,
				file   : file.name,
				preview: preview.name

			}), CONFIG)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	stopRecording(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/stopRecording/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	saveRecording(camera: mediaStream): Promise<void>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/saveRecording/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

	// cleanRecording(){}

};

export default streamHttpRecord;
