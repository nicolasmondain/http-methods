/* eslint-disable no-unused-vars */

import {EventEngineGreenscreen, EventEngineMedia, EventEnginePrinter, EventEngineStream} from '../event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

export type httpMethodsModule = Record<string, void|Promise>;

export interface httpMethodsPrint {

	numberOfLeftPrintSheets(printer:EventEnginePrinter): Promise<httpResponse>;
	morePrints(printer: EventEnginePrinter, file: EventEngineMedia, copies: number): Promise<httpResponse>;
	print(printer: EventEnginePrinter, file: EventEngineMedia, copies: number, simulate: boolean): Promise<httpResponse>;

}

export interface httpMethodsStream {

	version(camera: EventEngineStream): Promise<httpResponse>;
	quit(camera: EventEngineStream): Promise<void>;
	areYouHere(camera: EventEngineStream): Promise<httpResponse>;
	getCameraList(camera: EventEngineStream): Promise<httpResponse>;

	shootAndWait(camera: EventEngineStream, file: EventEngineMedia): Promise<httpResponse>;
	getLastShootErrorMessage(camera: EventEngineStream): Promise<httpResponse>;
	cancelPending(camera: EventEngineStream): Promise<httpResponse>;
	writePictureStreamToFile(camera: EventEngineStream, file: EventEngineMedia): Promise<httpResponse>;
	getAvailableFileStreamCount(camera: EventEngineStream): Promise<httpResponse>;
	deleteFile(camera: EventEngineStream, file: EventEngineMedia): Promise<httpResponse>;
	getFile(camera: EventEngineStream, file: EventEngineMedia): Promise<httpResponse>;

	changeOrientation(camera: EventEngineStream, orientation: string): Promise<httpResponse>;
	getAvailableIso(camera: EventEngineStream): Promise<httpResponse>;
	getAvailableWb(camera: EventEngineStream): Promise<httpResponse>;
	getAvailableTv(camera: EventEngineStream): Promise<httpResponse>;
	getFrameSizes(camera: EventEngineStream): Promise<httpResponse>;

	startRecording(camera: EventEngineStream, folder: string, file: EventEngineMedia): Promise<httpResponse>;
	startRecordingWithPicture(camera: EventEngineStream, folder: string, file: EventEngineMedia, preview: EventEngineMedia): Promise<httpResponse>;
	stopRecording(camera: EventEngineStream): Promise<httpResponse>;
	cleanRecording(camera: EventEngineStream): Promise<httpResponse>;

	startLiveView(camera: EventEngineStream): Promise<httpResponse>;
	stopLiveView(camera: EventEngineStream): Promise<httpResponse>;
	getLivefeedAsImage(camera: EventEngineStream): string;
	getLivefeedStatus(camera: EventEngineStream): Promise<httpResponse>;

	greenscreenOn(camera: EventEngineStream, greenscreen: EventEngineGreenscreen): Promise<httpResponse>;
	greenscreenOff(camera: EventEngineStream): Promise<httpResponse>;
	backgroundGreenscreenArray(camera: EventEngineStream, files: string): Promise<httpResponse>;
	updateGreenscreen(camera: EventEngineStream, file: string): Promise<httpResponse>;

}

