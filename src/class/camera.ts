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

		Server.httpResponseCheck(version);

		return version;

	}

	async quit(): Promise<httpResponse>{

		const quit = await streamHttpMethods.quit(this);

		Server.httpResponseCheck(quit);

		return quit;

	}

	async areYouHere(): Promise<httpResponse>{

		const areYouHere = await streamHttpMethods.areYouHere(this);

		Server.httpResponseCheck(areYouHere);

		return areYouHere;

	}

	async getCameraList(): Promise<httpResponse>{

		const getCameraList = await streamHttpMethods.getCameraList(this);

		Server.httpResponseCheck(getCameraList);

		return getCameraList;

	}

	async shootAndWait(file: EventEngineMedia): Promise<httpResponse>{

		const shootAndWait = await streamHttpMethods.shootAndWait(this, file);

		Server.httpResponseCheck(shootAndWait);

		return shootAndWait;

	}

	async getLastShootErrorMessage(): Promise<httpResponse>{

		const getLastShootErrorMessage = await streamHttpMethods.getLastShootErrorMessage(this);

		Server.httpResponseCheck(getLastShootErrorMessage);

		return getLastShootErrorMessage;

	}

	async cancelPending(): Promise<httpResponse>{

		const cancelPending = await streamHttpMethods.cancelPending(this);

		Server.httpResponseCheck(cancelPending);

		return cancelPending;

	}

	async writePictureStreamToFile(file: EventEngineMedia): Promise<httpResponse>{

		const writePictureStreamToFile = await streamHttpMethods.writePictureStreamToFile(this, file);

		Server.httpResponseCheck(writePictureStreamToFile);

		return writePictureStreamToFile;

	}

	async getAvailableFilestreamCount(): Promise<httpResponse>{

		const getAvailableFilestreamCount = await streamHttpMethods.getAvailableFilestreamCount(this);

		Server.httpResponseCheck(getAvailableFilestreamCount);

		return getAvailableFilestreamCount;

	}

	async deleteFile(file: EventEngineMedia): Promise<httpResponse>{

		const deleteFile = await streamHttpMethods.deleteFile(this, file);

		Server.httpResponseCheck(deleteFile);

		return deleteFile;

	}

	async getFile(file: EventEngineMedia): Promise<httpResponse>{

		const getFile = await streamHttpMethods.getFile(this, file);

		Server.httpResponseCheck(getFile);

		return getFile;

	}

	async changeOrientation(orientation: string): Promise<httpResponse>{

		const changeOrientation = await streamHttpMethods.changeOrientation(this, orientation);

		Server.httpResponseCheck(changeOrientation);

		return changeOrientation;

	}

	async getAvailableIso(): Promise<httpResponse>{

		const getAvailableIso = await streamHttpMethods.getAvailableIso(this);

		Server.httpResponseCheck(getAvailableIso);

		return getAvailableIso;

	}

	async getAvailableWb(): Promise<httpResponse>{

		const getAvailableWb = await streamHttpMethods.getAvailableWb(this);

		Server.httpResponseCheck(getAvailableWb);

		return getAvailableWb;

	}

	async getAvailableTv(): Promise<httpResponse>{

		const getAvailableTv = await streamHttpMethods.getAvailableTv(this);

		Server.httpResponseCheck(getAvailableTv);

		return getAvailableTv;

	}

	async getFrameSizes(): Promise<httpResponse>{

		const getFrameSizes = await streamHttpMethods.getFrameSizes(this);

		Server.httpResponseCheck(getFrameSizes);

		return getFrameSizes;

	}

	async startRecording(folder: string, file: EventEngineMedia): Promise<httpResponse>{

		const startRecording = await streamHttpMethods.startRecording(this, folder, file);

		Server.httpResponseCheck(startRecording);

		return startRecording;

	}

	async startRecordingWithPicture(folder: string, file: EventEngineMedia, preview: EventEngineMedia): Promise<httpResponse>{

		const startRecordingWithPicture = await streamHttpMethods.startRecordingWithPicture(this, folder, file, preview);

		Server.httpResponseCheck(startRecordingWithPicture);

		return startRecordingWithPicture;

	}

	async stopRecording(): Promise<httpResponse>{

		const stopRecording = await streamHttpMethods.stopRecording(this);

		Server.httpResponseCheck(stopRecording);

		return stopRecording;

	}

	async cleanRecording(): Promise<httpResponse>{

		const cleanRecording = await streamHttpMethods.cleanRecording(this);

		Server.httpResponseCheck(cleanRecording);

		return cleanRecording;

	}

	async setRecordingModeOn(): Promise<httpResponse>{

		const setRecordingModeOn = await streamHttpMethods.setRecordingModeOn(this);

		Server.httpResponseCheck(setRecordingModeOn);

		return setRecordingModeOn;

	}

	async setRecordingModeOff(): Promise<httpResponse>{

		const setRecordingModeOff = await streamHttpMethods.setRecordingModeOff(this);

		Server.httpResponseCheck(setRecordingModeOff);

		return setRecordingModeOff;

	}

	async startLiveView(): Promise<httpResponse>{

		const startLiveView = await streamHttpMethods.startLiveView(this);

		Server.httpResponseCheck(startLiveView);

		return startLiveView;

	}

	async stopLiveView(): Promise<httpResponse>{

		const stopLiveView = await streamHttpMethods.stopLiveView(this);

		Server.httpResponseCheck(stopLiveView);

		return stopLiveView;

	}

	getLivefeedAsImage(): string{

		const getLivefeedAsImage = streamHttpMethods.getLivefeedAsImage(this);

		return getLivefeedAsImage;

	}

	async getLivefeedStatus(): Promise<httpResponse>{

		const getLivefeedStatus = await streamHttpMethods.getLivefeedStatus(this);

		Server.httpResponseCheck(getLivefeedStatus);

		return getLivefeedStatus;

	}

	async greenscreenOn(greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		const greenscreenOn = await streamHttpMethods.greenscreenOn(this, greenscreen);

		Server.httpResponseCheck(greenscreenOn);

		return greenscreenOn;

	}

	async greenscreenOff(): Promise<httpResponse>{

		const greenscreenOff = await streamHttpMethods.greenscreenOff(this);

		Server.httpResponseCheck(greenscreenOff);

		return greenscreenOff;

	}

	async backgroundGreenscreenArray(files: string): Promise<httpResponse>{

		const backgroundGreenscreenArray = await streamHttpMethods.backgroundGreenscreenArray(this, files);

		Server.httpResponseCheck(backgroundGreenscreenArray);

		return backgroundGreenscreenArray;


	}

	async updateGreenscreen(file: string): Promise<httpResponse>{

		const updateGreenscreen = await streamHttpMethods.updateGreenscreen(this, file);

		Server.httpResponseCheck(updateGreenscreen);

		return updateGreenscreen;

	}

}
