import {

	httpURL

} from './@types/http-methods/index';

import axios from 'axios';
import qs from 'qs';

import httpStatus from '@sharingbox/http-status/dist/browser';

const CONFIG                   = {headers: {'content-type': 'application/x-www-form-urlencoded'}};
const PARAM_DEBUG_PRINT_SERVER = 0;

export default {

	numberOfLeftPrintSheets(url: httpURL){

		return new Promise((resolve, reject) => {

			axios
			.get(`${url}/numberOfLeftPrintSheets/`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					let number = 0;

					number = Number.parseInt(response.data, 10);
					number = Number.isNaN(number) ? 0 : number;

					resolve(number);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	morePrints(server: string, file, copies){

		return new Promise((resolve, reject) => {

			const {idFTPevent} = file.meta.current;

			axios
			.post(`${server}/morePrints/`, qs.stringify({

				idevent: idFTPevent,
				copies

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

	print(server: string, file, copies, simulate){

		return new Promise((resolve, reject) => {

			axios
			.post(`${server}/print/`, qs.stringify({

				file    : file.path,
				nbcopies: copies,
				delete  : PARAM_DEBUG_PRINT_SERVER,
				simulate

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

	}

};
