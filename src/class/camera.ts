import {

	EventEngineExposure,
	EventEngineFocus,
	EventEngineGreenscreen,
	EventEngineMedia,
	EventEngineStream,
	EventEngineStreamFrame,
	EventEngineWhiteBalance

} from '../@types/event-engine';

import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import streamHttpMethods from '../stream/stream-http';

export class Camera {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	name        : string;
	rank        : number;
	orientation : string;
	frame       : EventEngineStreamFrame;
	focus       : EventEngineFocus;
	exposure    : EventEngineExposure;
	whiteBalance: EventEngineWhiteBalance;

	constructor(options: EventEngineStream){

		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = options.url;

		this.name         = options.name;
		this.rank         = options.rank;
		this.orientation  = options.orientation;
		this.frame        = options.frame;
		this.focus        = options.focus;
		this.exposure     = options.exposure;
		this.whiteBalance = options.whiteBalance;

	}

	version(): Promise<httpResponse>{

		const version = streamHttpMethods.version(this);

		return version;

	}

	quit(): Promise<httpResponse>{

		const quit = streamHttpMethods.quit(this);

		return quit;

	}

	areYouHere(): Promise<httpResponse>{

		const areYouHere = streamHttpMethods.areYouHere(this);

		return areYouHere;

	}

	getCameraList(): Promise<httpResponse>{

		const getCameraList = streamHttpMethods.getCameraList(this);

		return getCameraList;

	}

	shootAndWait(file: EventEngineMedia): Promise<httpResponse>{

		const shootAndWait = streamHttpMethods.shootAndWait(this, file);

		return shootAndWait;

	}

	getLastShootErrorMessage(): Promise<httpResponse>{

		const getLastShootErrorMessage = streamHttpMethods.getLastShootErrorMessage(this);

		return getLastShootErrorMessage;

	}

	cancelPending(): Promise<httpResponse>{

		const cancelPending = streamHttpMethods.cancelPending(this);

		return cancelPending;

	}

	writePictureStreamToFile(file: EventEngineMedia): Promise<httpResponse>{

		const writePictureStreamToFile = streamHttpMethods.writePictureStreamToFile(this, file);

		return writePictureStreamToFile;

	}

	getAvailableFileStreamCount(): Promise<httpResponse>{

		const getAvailableFileStreamCount = streamHttpMethods.getAvailableFileStreamCount(this);

		return getAvailableFileStreamCount;

	}

	deleteFile(file: EventEngineMedia): Promise<httpResponse>{

		const deleteFile = streamHttpMethods.deleteFile(this, file);

		return deleteFile;

	}

	getFile(file: EventEngineMedia): Promise<httpResponse>{

		const getFile = streamHttpMethods.getFile(this, file);

		return getFile;

	}


	changeOrientation(orientation: string): Promise<httpResponse>{

		const changeOrientation = streamHttpMethods.changeOrientation(this, orientation);

		return changeOrientation;

	}

	getAvailableIso(): Promise<httpResponse>{

		const getAvailableIso = streamHttpMethods.getAvailableIso(this);

		return getAvailableIso;

	}

	getAvailableWb(): Promise<httpResponse>{

		const getAvailableWb = streamHttpMethods.getAvailableWb(this);

		return getAvailableWb;

	}

	getAvailableTv(): Promise<httpResponse>{

		const getAvailableTv = streamHttpMethods.getAvailableTv(this);

		return getAvailableTv;

	}

	getFrameSizes(): Promise<httpResponse>{

		const getFrameSizes = streamHttpMethods.getFrameSizes(this);

		return getFrameSizes;

	}


	startRecording(folder: string, file: EventEngineMedia): Promise<httpResponse>{

		const startRecording = streamHttpMethods.startRecording(this, folder, file);

		return startRecording;

	}

	startRecordingWithPicture(folder: string, file: EventEngineMedia, preview: EventEngineMedia): Promise<httpResponse>{

		const startRecordingWithPicture = streamHttpMethods.startRecordingWithPicture(this, folder, file, preview);

		return startRecordingWithPicture;

	}

	stopRecording(): Promise<httpResponse>{

		const stopRecording = streamHttpMethods.stopRecording(this);

		return stopRecording;

	}

	cleanRecording(): Promise<httpResponse>{

		const cleanRecording = streamHttpMethods.cleanRecording(this);

		return cleanRecording;

	}


	startLiveView(): Promise<httpResponse>{

		const startLiveView = streamHttpMethods.startLiveView(this);

		return startLiveView;

	}

	stopLiveView(): Promise<httpResponse>{

		const stopLiveView = streamHttpMethods.stopLiveView(this);

		return stopLiveView;

	}

	getLivefeedAsImage(): string{

		const getLivefeedAsImage = streamHttpMethods.getLivefeedAsImage(this);

		return getLivefeedAsImage;

	}

	getLivefeedStatus(): Promise<httpResponse>{

		const getLivefeedStatus = streamHttpMethods.getLivefeedStatus(this);

		return getLivefeedStatus;

	}

	greenscreenOn(greenscreen: EventEngineGreenscreen): Promise<httpResponse>{

		const greenscreenOn = streamHttpMethods.greenscreenOn(this, greenscreen);

		return greenscreenOn;

	}

	greenscreenOff(): Promise<httpResponse>{

		const greenscreenOff = streamHttpMethods.greenscreenOff(this);

		return greenscreenOff;

	}

	backgroundGreenscreenArray(files: string): Promise<httpResponse>{

		const backgroundGreenscreenArray = streamHttpMethods.backgroundGreenscreenArray(this, files);

		return backgroundGreenscreenArray;


	}

	updateGreenscreen(file: string): Promise<httpResponse>{

		const updateGreenscreen = streamHttpMethods.updateGreenscreen(this, file);

		return updateGreenscreen;

	}

}
