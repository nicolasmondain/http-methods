import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'PRODUCTION';

const webHttpProduction: httpMethodsModule = {

	produceVideoWithImages(photobooth: Photobooth, data: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/produceVideoWithImages/`, qs.stringify({data}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	produceVideo(photobooth: Photobooth, data: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/produceVideo/`, qs.stringify({data}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default webHttpProduction;
