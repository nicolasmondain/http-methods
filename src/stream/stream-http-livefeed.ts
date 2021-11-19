import {

	getLivefeedStatusResponse,
	httpMethodsModule

} from '../@types/http-methods';

import {mediaStream} from '../@types/event-engine/mediaStream';

import axios from 'axios';

import httpStatus from '@sharingbox/http-status/dist/browser';

const streamHttpLivefeed: httpMethodsModule = {

	getLivefeedAsImage(camera: mediaStream): string{

		return`${camera.url}/getLivefeedAsImage/byName/${camera.name}?nocache=${new Date().getTime()}`;

	},

	getLivefeedStatus(camera: mediaStream): Promise<getLivefeedStatusResponse>{

		return new Promise((resolve, reject) => {

			axios
			.get(`${camera.url}/getLivefeedStatus/ByName/${camera.name}`)
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

};

export default streamHttpLivefeed;
