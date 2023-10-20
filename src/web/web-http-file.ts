import {EventEngineIncrustation, EventEngineMedia} from '../@types/event-engine';

import {Camera} from '../class/camera';
import {httpMethodsModule} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Photobooth} from '../class/photobooth';

import axios from 'axios';
import axiosConfig from '../config/axios.config';
import httpStatus from '@sharingbox/http-status/dist/browser';
import qs from 'qs';

const FORMAT_RESPONSE_SOURCE = 'WEB';
const SERVICE_UNAVAILABLE    = 503;

const webHttpFile: httpMethodsModule = {

	retrieveImageFromUrlAndSaveIt(photobooth: Photobooth, camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/retrieveImageFromUrlAndSaveIt/`, qs.stringify({

				url    : camera.url,
				command: `getFile/${file.name}`,
				path   : file.path

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

	retrieveDataFileFromIP(photobooth: Photobooth, ip: string, id: string, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/retrieveDataFileFromIP/`, qs.stringify({

				ip,
				session : id,
				filename: file.name,
				path    : file.path

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

	saveImage(photobooth: Photobooth, file: EventEngineMedia, base64: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/saveImage/`, qs.stringify({

				file: file.path,
				base64

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

	doesFileExist(photobooth: Photobooth, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/doesFileExist/`, qs.stringify({

				file: file.path

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

	rotate(photobooth: Photobooth, file: EventEngineMedia, angle: number): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/rotate/`, qs.stringify({

				file: file.path,
				angle

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

	flip(photobooth: Photobooth, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/Flip/`, qs.stringify({

				file: file.path

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

	flop(photobooth: Photobooth, file: EventEngineMedia): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/Flop/`, qs.stringify({

				file: file.path

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

	resizeImageAndSaveIt(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia, flip = false){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/resizeImageAndSaveIt/`, qs.stringify({

				width      : destination.size.width,
				height     : destination.size.height,
				source     : source.path,
				destination: destination.path,
				flip

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

	putImageInAreaAndSaveIt(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia, incrustation: EventEngineIncrustation, branding = {path: ''} as EventEngineMedia, flip = false){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/putImageInAreaAndSaveIt/`, qs.stringify({

				source     : source.path,
				destination: destination.path,
				branding   : branding.path,
				x          : incrustation.x,
				y          : incrustation.y,
				w          : incrustation.w,
				h          : incrustation.h,
				width      : destination.size.width,
				height     : destination.size.height,
				flip

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

	writeTextFileInSession(photobooth: Photobooth, id: string, file: EventEngineMedia, text: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/writeTextFileInSession/`, qs.stringify({

				id,
				text,
				name: file.name

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

	writeTextFile(photobooth: Photobooth, file: EventEngineMedia, text: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/writeTextFile/`, qs.stringify({

				path: file.path,
				text

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

	copyFile(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/copyFile/`, qs.stringify({

				source     : source.path,
				destination: destination.path

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

	copyFileForSecondaryGallery(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/copyFileForSecondaryGallery/`, qs.stringify({

				source     : source.path,
				destination: destination.path

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

	moveFile(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/moveFile/`, qs.stringify({

				source     : source.path,
				destination: destination.path

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

	moveFileForSecondaryGallery(photobooth: Photobooth, source: EventEngineMedia, destination: EventEngineMedia){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/moveFileForSecondaryGallery/`, qs.stringify({

				source     : source.path,
				destination: destination.path

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

	whatIsInDirectoryJson(photobooth: Photobooth, directory: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/whatIsInDirectoryJson/`, qs.stringify({directory}), axiosConfig)
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

	deleteSession(photobooth: Photobooth, id: string): Promise<httpResponse>{

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/deleteSession/`, qs.stringify({

				session: id

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

	deleteFilesInSession(photobooth: Photobooth, id:string, files: string){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/deleteFilesInSession/`, qs.stringify({

				session: id,
				files

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

	deleteFileFromPath(photobooth: Photobooth, path:string){

		return new Promise((resolve, reject) => {

			axios
			.post(`${photobooth.url}/deleteFileFromPath/`, qs.stringify({path}), axiosConfig)
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

export default webHttpFile;
