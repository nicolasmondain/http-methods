import {Camera} from '../class/camera';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';

const FORMAT_RESPONSE_SOURCE = 'STREAM';
const SERVICE_UNAVAILABLE    = 503;

const streamHttpSettings: httpMethodsModule = {

	changeOrientation(camera: Camera, orientation: string): Promise<httpResponse>{

		const options = ['Default', 'Flip right', 'Flip left', 'Upside down'];

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/changeOrientation/${options.includes(orientation) ? orientation : options[0]}`, axiosConfig)
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

	getAvailableIso(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableIso/ByName/${camera.name}`, axiosConfig)
			.then((response) => {

				let iso = 0;

				iso = Number.parseInt(response.data, 10);
				iso = Number.isNaN(iso) ? 0 : iso;

				resolve(httpStatus.formatResponse(response.status, iso, null, httpStatus.formatResponseConfig(response, FORMAT_RESPONSE_SOURCE)));

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

	getAvailableWb(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableWb/ByName/${camera.name}`, axiosConfig)
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

	getAvailableTv(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableTv/ByName/${camera.name}`, axiosConfig)
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

	getFrameSizes(camera: Camera): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFrameSizes/ByName/${camera.name}`, axiosConfig)
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

	changeTv(camera: Camera, tv:number){

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/changetv/ByName/${camera.name}/${tv}`, axiosConfig)
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

	changeIso(camera: Camera, iso:number){

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/changeiso/ByName/${camera.name}/${iso}`, axiosConfig)
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

	changeWb(camera: Camera, wb:string){

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/changewb/ByName/${camera.name}/${wb}`, axiosConfig)
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

export default streamHttpSettings;
