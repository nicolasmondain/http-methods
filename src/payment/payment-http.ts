import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Payment} from '../class/payment';

import axios from 'axios';
import axiosConfig from '../config/axios.config';

import httpStatus from '@sharingbox/http-status/dist/browser';

const FORMAT_RESPONSE_SOURCE   = 'PAYMENT';
const SERVICE_UNAVAILABLE      = 503;
const STRIPE_DEFAULT_STATUS    = 200;

const paymentHttp: httpMethodsModule = {

	code(payment: Payment, scan: string, options = {idFTPevent: '', idSession: '', idBox: 0}): Promise<httpResponse>{

		if(payment.qrcode && (!options.idFTPevent || !options.idSession || !options.idBox)){

			return Promise.resolve(httpStatus.formatResponse(STRIPE_DEFAULT_STATUS, null, null, httpStatus.formatResponseConfig({}, FORMAT_RESPONSE_SOURCE)));

		}

		const string = payment.qrcode ? `${options.idFTPevent}/${options.idSession}/${options.idBox}/${scan}` : scan;

		return new Promise((resolve, reject) => {

			axios
			.get(`${payment.url}/code/${string}`, axiosConfig)
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

	cancelSession(payment: Payment): Promise<httpResponse>{

		if(payment.qrcode){

			return Promise.resolve(httpStatus.formatResponse(STRIPE_DEFAULT_STATUS, null, null, httpStatus.formatResponseConfig({}, FORMAT_RESPONSE_SOURCE)));

		}

		return new Promise((resolve, reject) => {

			axios
			.get(`${payment.url}/cancelSession/`, axiosConfig)
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

export default paymentHttp;
