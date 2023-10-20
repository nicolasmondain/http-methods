import {Api} from '../class/api';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'API';
const SERVICE_UNAVAILABLE    = 503;
const URL_DEV 							= 'https://event-editor.sharingbox.com';
const URL_STAGING 					= 'https://event-editor.sharingbox.com';
const URL_PRODUCTION 				= 'https://event-editor.sharingbox.com';

const eventeditor = (api: Api) => {

	let url = '';

	switch(api.env){

		case 'development':
			url = URL_DEV;
			break;

		case 'staging':
			url = URL_STAGING;
			break;

		case 'production':
			url = URL_PRODUCTION;
			break;

		default:
			break;

	}

	return url;

};

const apiHttpPreform: httpMethodsModule = {

	getPreFormAll(api: Api): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${eventeditor(api)}/api/preform/`, axiosConfig)
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

	getPreForm(api: Api, idSession: string, token: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${eventeditor(api)}/api/preform/${idSession}/${token}/`, axiosConfig)
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

	deletePreForm(api: Api, idSession: string, token: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.delete(`${eventeditor(api)}/api/preform/${idSession}/${token}/`, axiosConfig)
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

	updatePreForm(api: Api, idSession: string, token: string, data: Record<string, unknown>): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.put(`${eventeditor(api)}/api/preform/${idSession}/${token}/`, qs.stringify(data), axiosConfig)
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

export default apiHttpPreform;
