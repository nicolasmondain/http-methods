import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const FORMAT_RESPONSE_SOURCE = 'WEB';
const SERVICE_UNAVAILABLE    = 503;

const webHttpConfiguration: httpMethodsModule = {

	getConfiguration(photobooth: Photobooth, idFTPevent: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/event/${idFTPevent}/web/configuration.json?nocache=${new Date().getTime()}`, axiosConfig)
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

	getData(photobooth: Photobooth, idFTPevent: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/event/${idFTPevent}/web/data.json?nocache=${new Date().getTime()}`, axiosConfig)
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

	getPublish(photobooth: Photobooth, idFTPevent: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/event/${idFTPevent}/web/publish.json?nocache=${new Date().getTime()}`, axiosConfig)
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

export default webHttpConfiguration;
