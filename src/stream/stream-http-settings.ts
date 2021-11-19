import {httpMethodsModule} from '../@types/http-methods';
import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';

import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpSettings: httpMethodsModule = {

	changeOrientation(camera: mediaStream, orientation: string): Promise<void>{

		const options = ['Default', 'Flip right', 'Flip left', 'Upside down'];

		return new Promise((resolve, reject) => {

			axios
			.post(`${camera.url}/changeOrientation/${options.includes(orientation) ? orientation : options[0]}`)
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

	getAvailableIso(camera: mediaStream): Promise<number>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableIso/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					let iso = 0;

					iso = Number.parseInt(response.data, 10);
					iso = Number.isNaN(iso) ? 0 : iso;

					resolve(iso);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableWb(camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableWb/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getAvailableTv(camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getAvailableTv/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	},

	getFrameSizes(camera: mediaStream): Promise<string>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getFrameSizes/ByName/${camera.name}`)
			.then((response) => {

				if(httpStatus.isOK(response.status)){

					resolve(response.data);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

	// saveServices(){}

};

export default streamHttpSettings;
