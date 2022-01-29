import {

	EventEngineGreenscreen,
	EventEngineMedia,
	EventEngineServer,
	EventEngineStream,
	EventEngineStreamExposure,
	EventEngineStreamFocus,
	EventEngineStreamFrame,
	EventEngineStreamWhiteBalance

} from '../@types/event-engine';

import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Server} from './server';
import streamHttpMethods from '../stream/stream-http';

export class Camera extends Server{

	name        : string;
	rank        : number;
	orientation : string;
	frame       : EventEngineStreamFrame;
	focus       : EventEngineStreamFocus;
	exposure    : EventEngineStreamExposure;
	whiteBalance: EventEngineStreamWhiteBalance;

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super(server);

		this.name         = camera.name;
		this.rank         = camera.rank;
		this.orientation  = camera.orientation;
		this.frame        = camera.frame;
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

				const cameraFrame = {

					height: image.height,
					width : image.width,
					ratio : image.height / image.width

				};

				this.frame = cameraFrame;

				resolve(cameraFrame);

			};

			image.src = this.getLivefeedAsImage();

		});

	}

	async version(): Promise<httpResponse>{

		const version = await streamHttpMethods.version(this);

		return version;

	}

	async quit(): Promise<httpResponse>{

		const quit = await streamHttpMethods.quit(this);

		return quit;

	}

	async areYouHere(): Promise<httpResponse>{

		const areYouHere = await streamHttpMethods.areYouHere(this);

		return areYouHere;

	}

	async getCameraList(): Promise<httpResponse>{

		const getCameraList = await streamHttpMethods.getCameraList(this);

		return getCameraList;

	}

	async shootAndWait(file: EventEngineMedia): Promise<httpResponse>{

		const shootAndWait = await streamHttpMethods.shootAndWait(this, file);

		return shootAndWait;

	}

	async getLastShootErrorMessage(): Promise<httpResponse>{

		const getLastShootErrorMessage = await streamHttpMethods.getLastShootErrorMessage(this);

		return getLastShootErrorMessage;

	}

	async cancelPending(): Promise<httpResponse>{

		const cancelPending = await streamHttpMethods.cancelPending(this);

		return cancelPending;

	}

	async writePictureStreamToFile(file: EventEngineMedia): Promise<httpResponse>{

		const writePictureStreamToFile = await streamHttpMethods.writePictureStreamToFile(this, file);

		return writePictureStreamToFile;

	}

	getAvailableFilestreamCount(): Promise<httpResponse>{

		const getAvailableFilestreamCount = streamHttpMethods.getAvailableFilestreamCount(this);

		return getAvailableFilestreamCount;

	}

	async deleteFile(file: EventEngineMedia): Promise<httpResponse>{

		const deleteFile = await streamHttpMethods.deleteFile(this, file);

		return deleteFile;

	}

	async getFile(file: EventEngineMedia): Promise<httpResponse>{

		const getFile = await streamHttpMethods.getFile(this, file);

		return getFile;

	}


	async changeOrientation(orientation: string): Promise<httpResponse>{

		const changeOrientation = await streamHttpMethods.changeOrientation(this, orientation);

		return changeOrientation;

	}

	async getAvailableIso(): Promise<httpResponse>{

		const getAvailableIso = await streamHttpMethods.getAvailableIso(this);

		return getAvailableIso;

	}

	async getAvailableWb(): Promise<httpResponse>{

		const getAvailableWb = await streamHttpMethods.getAvailableWb(this);

		return getAvailableWb;

	}

	async getAvailableTv(): Promise<httpResponse>{

		const getAvailableTv = await streamHttpMethods.getAvailableTv(this);

		return getAvailableTv;

	}

	async getFrameSizes(): Promise<httpResponse>{

		const getFrameSizes = await streamHttpMethods.getFrameSizes(this);

		return getFrameSizes;

	}

	async startRecording(folder: string, file: EventEngineMedia): Promise<httpResponse>{

		const startRecording = await streamHttpMethods.startRecording(this, folder, file);

		return startRecording;

	}

	async startRecordingWithPicture(folder: string, file: EventEngineMedia, preview: EventEngineMedia): Promise<httpResponse>{

		const startRecordingWithPicture = await streamHttpMethods.startRecordingWithPicture(this, folder, file, preview);

		return startRecordingWithPicture;

	}

	async stopRecording(): Promise<httpResponse>{

		const stopRecording = await streamHttpMethods.stopRecording(this);

		return stopRecording;

	}

	async cleanRecording(): Promise<httpResponse>{

		const cleanRecording = await streamHttpMethods.cleanRecording(this);

		return cleanRecording;

	}

	async setRecordingModeOn(): Promise<httpResponse>{

		const setRecordingModeOn = await streamHttpMethods.setRecordingModeOn(this);

		return setRecordingModeOn;

	}

	async setRecordingModeOff(): Promise<httpResponse>{

		const setRecordingModeOff = await streamHttpMethods.setRecordingModeOff(this);

		return setRecordingModeOff;

	}

	async startLiveView(): Promise<httpResponse>{

		const startLiveView = await streamHttpMethods.startLiveView(this);

		return startLiveView;

	}

	async stopLiveView(): Promise<httpResponse>{

		const stopLiveView = await streamHttpMethods.stopLiveView(this);

		return stopLiveView;

	}

	getLivefeedAsImage(): string{

		const getLivefeedAsImage = streamHttpMethods.getLivefeedAsImage(this);

		return getLivefeedAsImage;

	}

	async getLivefeedStatus(): Promise<httpResponse>{

		const getLivefeedStatus = await streamHttpMethods.getLivefeedStatus(this);

		return getLivefeedStatus;

	}

	async greenscreenOn(greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		const greenscreenOn = await streamHttpMethods.greenscreenOn(this, greenscreen);

		return greenscreenOn;

	}

	async greenscreenOff(): Promise<httpResponse>{

		const greenscreenOff = await streamHttpMethods.greenscreenOff(this);

		return greenscreenOff;

	}

	async backgroundGreenscreenArray(files: string): Promise<httpResponse>{

		const backgroundGreenscreenArray = await streamHttpMethods.backgroundGreenscreenArray(this, files);

		return backgroundGreenscreenArray;


	}

	async updateGreenscreen(file: string): Promise<httpResponse>{

		const updateGreenscreen = await streamHttpMethods.updateGreenscreen(this, file);

		return updateGreenscreen;

	}

}
