import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';
import httpStatus from '@sharingbox/http-status/dist/browser';

import streamHttpGreenscreen from './stream-http-greenscreen';
import streamHttpLiveview from './stream-http-liveview';
import streamHttpRecord from './stream-http-record';
import streamHttpSettings from './stream-http-settings';
import streamHttpShoot from './stream-http-shoot';

const streamHttp: httpMethodsModule = {

	version(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/version/`)
			.then((response) => {

				if(httpStatus.isOK(response.status) || httpStatus.isImateapot(response.status)){

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

	quit(camera: mediaStream): Promise<void>{

		return new Promise((resolve) => {

			axios.get(`${camera.url}/quit/`);
			resolve();

		});

	},

	areYouHere(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/areYouHere/`)
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

	getCameraList(camera: mediaStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getCameraList/`)
			.then((response) => {

				if(httpStatus.isOK(response.status) || httpStatus.isImateapot(response.status)){

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

export default Object.assign(

	streamHttp,
	streamHttpGreenscreen,
	streamHttpLiveview,
	streamHttpRecord,
	streamHttpSettings,
	streamHttpShoot

);
