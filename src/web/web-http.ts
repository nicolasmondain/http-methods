import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

import wehHttpConfiguration from './web-http-configuration';
import webHttpFile from './web-http-file';
import webHttpProduction from './web-http-production';
import webHttpSettings from './web-http-settings';

const FORMAT_RESPONSE_SOURCE = 'WEB';
const SERVICE_UNAVAILABLE    = 503;

const webHttp: httpMethodsModule = {

	appDirectory(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/appDirectory/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

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

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

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

				if(axios.isAxiosError(error)){

					resolve(httpStatus.formatResponse(SERVICE_UNAVAILABLE, null, error, httpStatus.formatResponseConfig(error, FORMAT_RESPONSE_SOURCE)));

				}else{

					reject(error);

				}

			});

		});

	}

};

export default Object.assign(

	wehHttpConfiguration,
	webHttp,
	webHttpFile,
	webHttpProduction,
	webHttpSettings

);
