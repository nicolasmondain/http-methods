import {

	EventEngineGreenscreen,
	EventEngineMedia,
	EventEngineServer,
	EventEngineServerType,
	EventEngineStream,
	EventEngineStreamExposure,
	EventEngineStreamFocus,
	EventEngineStreamFrame,
	EventEngineStreamWhiteBalance

} from '../@types/event-engine';

import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Server} from './server';
import streamHttpMethods from '../stream/stream-http';

export class Camera extends Server{

	name         : string;
	rank         : number;
	orientation? : string;
	frame        : EventEngineStreamFrame;
	focus        : EventEngineStreamFocus;
	exposure     : EventEngineStreamExposure;
	whiteBalance : EventEngineStreamWhiteBalance;

	constructor(type: EventEngineServerType, server: EventEngineServer, camera: EventEngineStream){

		super(type, server);

		this.name         = camera.name;
		this.rank         = camera.rank;
		this.orientation  = camera.orientation || 'Default';
		this.frame        = {};
		this.focus        = camera.focus;
		this.exposure     = camera.exposure;
		this.whiteBalance = camera.whiteBalance;

	}

	updateCameraFrame(): Promise<EventEngineStreamFrame>{

		return new Promise((resolve, reject) => {

			const image = new Image();

			image.onerror = (error) => {

				reject(error);

			};

			image.onload = () => {

				this.frame.height = image.height;
				this.frame.width  = image.width;
				this.frame.ratio  = image.height / image.width;

				resolve(this.frame);

			};

			image.src = this.getLivefeedAsImage();

		});

	}

	updateEosDetails(): Promise<httpResponse>{

		let updateEosDetails = {} as httpResponse;
		let exposureDuration = '';

		this.exposure.duration = 0;

		return new Promise((resolve, reject) => {

			this.getCameraList()
			.then((getCameraList) => {

				const camera = getCameraList.data?.eos?.details?.find((c: Camera) => c.name === this.name);

				if(camera){

					exposureDuration = camera?.properties?.Exp;

					if(exposureDuration && typeof exposureDuration === 'string'){

						exposureDuration       = exposureDuration.replace(',', '.').replace(/ /gu, '');
						this.exposure.duration = exposureDuration.includes('/') ? Number(exposureDuration.split('/')[0]) / Number(exposureDuration.split('/')[1]) : Number(exposureDuration);

					}

				}

				updateEosDetails = httpStatus.responseOK(getCameraList.data);

				resolve(updateEosDetails);

			})
			.catch((error) => {

				reject(error);

			});

		});

	}

	async version(): Promise<httpResponse>{

		const version = await streamHttpMethods.version(this);

		this.httpResponseCheck(version);

		return version;

	}

	async quit(): Promise<httpResponse>{

		const quit = await streamHttpMethods.quit(this);

		this.httpResponseCheck(quit);

		return quit;

	}

	async areYouHere(): Promise<httpResponse>{

		const areYouHere = await streamHttpMethods.areYouHere(this);

		this.httpResponseCheck(areYouHere);

		return areYouHere;

	}

	async getCameraList(): Promise<httpResponse>{

		const getCameraList = await streamHttpMethods.getCameraList(this);

		this.httpResponseCheck(getCameraList);

		return getCameraList;

	}

	async shootAndWait(file: EventEngineMedia): Promise<httpResponse>{

		const shootAndWait = await streamHttpMethods.shootAndWait(this, file);

		this.httpResponseCheck(shootAndWait);

		return shootAndWait;

	}

	async getLastShootErrorMessage(): Promise<httpResponse>{

		const getLastShootErrorMessage = await streamHttpMethods.getLastShootErrorMessage(this);

		this.httpResponseCheck(getLastShootErrorMessage);

		return getLastShootErrorMessage;

	}

	async cancelPending(): Promise<httpResponse>{

		const cancelPending = await streamHttpMethods.cancelPending(this);

		this.httpResponseCheck(cancelPending);

		return cancelPending;

	}

	async writePictureStreamToFile(file: EventEngineMedia): Promise<httpResponse>{

		const writePictureStreamToFile = await streamHttpMethods.writePictureStreamToFile(this, file);

		this.httpResponseCheck(writePictureStreamToFile);

		return writePictureStreamToFile;

	}

	async getAvailableFilestreamCount(): Promise<httpResponse>{

		const getAvailableFilestreamCount = await streamHttpMethods.getAvailableFilestreamCount(this);

		this.httpResponseCheck(getAvailableFilestreamCount);

		return getAvailableFilestreamCount;

	}

	async deleteFile(file: EventEngineMedia): Promise<httpResponse>{

		const deleteFile = await streamHttpMethods.deleteFile(this, file);

		this.httpResponseCheck(deleteFile);

		return deleteFile;

	}

	async getFile(file: EventEngineMedia): Promise<httpResponse>{

		const getFile = await streamHttpMethods.getFile(this, file);

		this.httpResponseCheck(getFile);

		return getFile;

	}

	async changeOrientation(orientation: string): Promise<httpResponse>{

		const changeOrientation = await streamHttpMethods.changeOrientation(this, orientation);

		this.httpResponseCheck(changeOrientation);

		return changeOrientation;

	}

	async getAvailableIso(): Promise<httpResponse>{

		const getAvailableIso = await streamHttpMethods.getAvailableIso(this);

		this.httpResponseCheck(getAvailableIso);

		return getAvailableIso;

	}

	async getAvailableWb(): Promise<httpResponse>{

		const getAvailableWb = await streamHttpMethods.getAvailableWb(this);

		this.httpResponseCheck(getAvailableWb);

		return getAvailableWb;

	}

	async getAvailableTv(): Promise<httpResponse>{

		const getAvailableTv = await streamHttpMethods.getAvailableTv(this);

		this.httpResponseCheck(getAvailableTv);

		return getAvailableTv;

	}

	async getFrameSizes(): Promise<httpResponse>{

		const getFrameSizes = await streamHttpMethods.getFrameSizes(this);

		this.httpResponseCheck(getFrameSizes);

		return getFrameSizes;

	}

	async startRecording(folder: string, file: EventEngineMedia, preview?: EventEngineMedia): Promise<httpResponse>{

		const startRecording = await streamHttpMethods.startRecording(this, folder, file, preview);

		this.httpResponseCheck(startRecording);

		return startRecording;

	}

	async stopRecording(folder: string, file: EventEngineMedia, clear = false): Promise<httpResponse>{

		const stopRecording = await streamHttpMethods.stopRecording(this, folder, file, clear);

		this.httpResponseCheck(stopRecording);

		return stopRecording;

	}

	async cleanRecording(): Promise<httpResponse>{

		const cleanRecording = await streamHttpMethods.cleanRecording(this);

		this.httpResponseCheck(cleanRecording);

		return cleanRecording;

	}

	async startLiveView(): Promise<httpResponse>{

		const startLiveView = await streamHttpMethods.startLiveView(this);

		this.httpResponseCheck(startLiveView);

		return startLiveView;

	}

	async stopLiveView(): Promise<httpResponse>{

		const stopLiveView = await streamHttpMethods.stopLiveView(this);

		this.httpResponseCheck(stopLiveView);

		return stopLiveView;

	}

	getLivefeedAsImage(): string{

		const getLivefeedAsImage = streamHttpMethods.getLivefeedAsImage(this);

		return getLivefeedAsImage;

	}

	async saveLivefeedAsImage(width: number, height: number, destination: EventEngineMedia): Promise<httpResponse>{

		const saveLivefeedAsImage = await streamHttpMethods.saveLivefeedAsImage(this, width, height, destination);

		return saveLivefeedAsImage;

	}

	async getLivefeedStatus(): Promise<httpResponse>{

		const getLivefeedStatus = await streamHttpMethods.getLivefeedStatus(this);

		this.httpResponseCheck(getLivefeedStatus);

		return getLivefeedStatus;

	}

	async greenscreenOn(greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		const greenscreenOn = await streamHttpMethods.greenscreenOn(this, greenscreen);

		this.httpResponseCheck(greenscreenOn);

		return greenscreenOn;

	}

	async greenscreenOff(): Promise<httpResponse>{

		const greenscreenOff = await streamHttpMethods.greenscreenOff(this);

		this.httpResponseCheck(greenscreenOff);

		return greenscreenOff;

	}

	async backgroundGreenscreenArray(files: string): Promise<httpResponse>{

		const backgroundGreenscreenArray = await streamHttpMethods.backgroundGreenscreenArray(this, files);

		this.httpResponseCheck(backgroundGreenscreenArray);

		return backgroundGreenscreenArray;

	}

	async updateGreenscreen(file: string): Promise<httpResponse>{

		const updateGreenscreen = await streamHttpMethods.updateGreenscreen(this, file);

		this.httpResponseCheck(updateGreenscreen);

		return updateGreenscreen;

	}

	async applyGreenscreen(file:string, source: EventEngineMedia, destination?: EventEngineMedia): Promise<httpResponse>{

		const applyGreenscreen = await streamHttpMethods.applyGreenscreen(this, file, source, destination);

		this.httpResponseCheck(applyGreenscreen);

		return applyGreenscreen;

	}

}
