import {EventEngineStream} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

import streamHttpGreenscreen from './stream-http-greenscreen';
import streamHttpLiveview from './stream-http-liveview';
import streamHttpRecord from './stream-http-record';
import streamHttpSettings from './stream-http-settings';
import streamHttpShoot from './stream-http-shoot';

const streamHttp: httpMethodsModule = {

	version(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/version/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	quit(camera: EventEngineStream): Promise<void>{

		return new Promise((resolve) => {

			axios.get(`${camera.url}/quit/`, axiosConfig);
			resolve();

		});

	},

	areYouHere(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/areYouHere/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getCameraList(camera: EventEngineStream): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getCameraList/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

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
