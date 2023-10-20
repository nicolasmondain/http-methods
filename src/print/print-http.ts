import {EventEngineMedia} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Printer} from '../class/printer';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const PARAM_DEBUG_PRINT_SERVER = 0;
const FORMAT_RESPONSE_SOURCE   = 'PRINT';
const SERVICE_UNAVAILABLE      = 503;

const printHttp: httpMethodsModule = {

	numberOfLeftPrintSheets(printer: Printer): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${printer.url}/numberOfLeftPrintSheets/`, axiosConfig)
			.then((response) => {

				let number = 0;

				number = Number.parseInt(response.data, 10);
				number = Number.isNaN(number) ? 0 : number;

				resolve(httpStatus.formatResponse(response.status, number, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

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

	dnpStatus(printer: Printer): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${printer.url}/DNPStatus/`, axiosConfig)
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

	morePrints(printer: Printer, file: EventEngineMedia, copies: number): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			const {idFTPevent} = file.meta.current;

			axios
			.post(`${printer.url}/morePrints/`, qs.stringify({

				idevent: idFTPevent,
				copies

			}), axiosConfig)
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

	print(printer: Printer, file: EventEngineMedia, copies: number, simulate: boolean): Promise<httpResponse>{

		const paper           = JSON.stringify(printer.paper);
		const sizes           = JSON.stringify(printer.sizes);
		const correspondances = JSON.stringify(printer.correspondances);

		return new Promise((resolve, reject) => {

			axios
			.post(`${printer.url}/print/`, qs.stringify({

				file    : file.path,
				nbcopies: copies,
				delete  : PARAM_DEBUG_PRINT_SERVER,
				simulate,
				paper,
				sizes,
				correspondances

			}), axiosConfig)
			.then((response) => {

				printer.limit -= copies;

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

export default printHttp;
