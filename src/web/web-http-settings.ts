import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const webHttpFile: httpMethodsModule = {

	whatMode(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/areYouHere/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	whatSystem(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/whatSystem/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	services(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/services/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	greenScreen(photobooth: Photobooth): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${photobooth.url}/greenScreen/`, axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default webHttpFile;
