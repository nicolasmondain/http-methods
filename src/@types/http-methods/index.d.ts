/* eslint-disable no-unused-vars */

import {EventEnginePrinter, EventEngineServer, EventEngineStream} from '../event-engine';

export type httpMethodsModule = Record<string, void|Promise>;

export interface CameraClassParams {

	SERVER : EventEngineServer;
	OPTIONS: EventEngineStream;

}

export interface PrinterClassParams {

	SERVER : EventEngineServer;
	OPTIONS: EventEnginePrinter;

}

export interface PhotoboothClassParams {

	SERVER : EventEngineServer;

}

export interface PhotoboothEventManagerModes {

	launch       : 'normal' | 'test';
	contactless  : boolean;
	configuration: boolean;
	screenshot   : boolean;

}

export interface PhotoboothEventManagerScreen {

	width : number;
	height: number;

}

export interface PhotoboothEventManagerGreenScreen {

	B?          : number;
	G?          : number;
	R?          : number;
	angle?      : number;
	background? : string;
	noise?      : number;

}

export interface PhotoboothEventManagerMediaStream {

	who         : string;
	name        : string;
	port        : string;
	rank        : string;
	orientation : string;
	frameWidth  : string;
	frameHeight : string;
	focus       : {setTo: string; value: string};
	exposure    : {setTo: string; duration: number|null; iso: string; bias: string};
	whiteBalance: {setTo: string; temperature: string; tint: string};

}

export interface PhotoboothEventManagerPrint {

	who     : string;
	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autoHide: boolean;

}

export interface PhotoboothEventManagerGallery {

	who  : string;
	where: string;

}

export interface PhotoboothEventManagerServices {

	mediasStream? : Array<PhotoboothEventManagerMediaStream>
	print?        : PhotoboothEventManagerPrint;
	gallery?      : PhotoboothEventManagerGallery;

}

export interface PhotoboothEventManager {

	version                : string;
	license                : number;
	directory              : string;
	services               : PhotoboothEventManagerServices;
	greenscreen            : PhotoboothEventManagerGreenScreen;
	modes                  : PhotoboothEventManagerModes;
	timeDifferenceWithCloud: number;

}
