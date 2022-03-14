import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

import webHttpFile from './web-http-file';
import webHttpProduction from './web-http-production';
import webHttpSettings from './web-http-settings';

const FORMAT_RESPONSE_SOURCE = 'WEB';

const webHttp: httpMethodsModule = {

	appDirectory(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/appDirectory/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	launchMediaServer(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/launchMediaServer/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	log(photobooth: Photobooth, string: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/log/${string}`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default Object.assign(

	webHttp,
	webHttpFile,
	webHttpProduction,
	webHttpSettings

);
