import {Camera} from '../class/camera';
import {EventEngineMedia} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const webHttp: httpMethodsModule = {

	retrieveImageFromUrlAndSaveIt(photobooth: Photobooth, camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/retrieveImageFromUrlAndSaveIt/`, qs.stringify({

				ipWeAsktheImage: camera.url,
				commandLine    : `getFile/${file.name}`,
				pathFile       : file.path

			}), axiosConfig)
			.then((response) => {

				resolve(httpStatus.formatResponse(response.status, response.data));

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

};

export default webHttp;
