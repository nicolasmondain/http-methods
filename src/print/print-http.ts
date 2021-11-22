import {eventEngineMedia} from '../@types/event-engine/eventEngineMedia';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG                   = {headers: {'content-type': 'application/x-www-form-urlencoded'}};
const PARAM_DEBUG_PRINT_SERVER = 0;

const printHttp: httpMethodsModule = {

	numberOfLeftPrintSheets(url: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/numberOfLeftPrintSheets/`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					let number = 0;

					number = Number.parseInt(response.data, 10);
					number = Number.isNaN(number) ? 0 : number;

					resolve(httpStatus.formatResponse(response.status, response.statusText, number));

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	morePrints(url: string, file: eventEngineMedia, copies: number): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			const {idFTPevent} = file.meta.current;

			axios
			.post(`${url}/morePrints/`, qs.stringify({

				idevent: idFTPevent,
				copies

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

	print(url: string, file: eventEngineMedia, copies: number, simulate: boolean): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${url}/print/`, qs.stringify({

				file    : file.path,
				nbcopies: copies,
				delete  : PARAM_DEBUG_PRINT_SERVER,
				simulate

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

	}

};

export default printHttp;
