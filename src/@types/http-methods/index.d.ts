/* eslint-disable no-unused-vars */

import {EventEnginePrinter, EventEngineServer, EventEngineServerType, EventEngineStream} from '../event-engine';
import {EventEngine} from '../../class/event-engine';

export type httpMethodsModule = Record<string, void|Promise>;

export interface CameraClassParams {

	SERVER : EventEngineServer;
	OPTIONS: EventEngineStream;
	TYPE   : EventEngineServerType;

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
	autoplay     : boolean;
	framework    : 'xamarin' | 'maui';

}

export interface PhotoboothEventManagerScreen {

	width      : number;
	height     : number;
	orientation: string;

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

	who          : string;
	name         : string;
	port         : string;
	rank         : string;
	orientation? : string;
	focus        : {setTo: string; value: string};
	exposure     : {setTo: string; duration: number|null; iso: string; bias: string};
	whiteBalance : {setTo: string; temperature: string; tint: string};

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

export interface PhotoboothEventManagerPayment {

	whatServer          : string;
	port                : string;
	mac                 : string;
	password            : string;
	withoutPaymentNeeded: boolean;

}

export interface PhotoboothEventManagerServices {

	mediasStream? : Array<PhotoboothEventManagerMediaStream>;
	video?        : Array<PhotoboothEventManagerMediaStream>;
	print?        : PhotoboothEventManagerPrint;
	gallery?      : PhotoboothEventManagerGallery;
	paiement?     : PhotoboothEventManagerPayment;

}

export interface PhotoboothEventManagerDetails {

	version  : string;
	directory: string;

}

export interface PhotoboothEventManagerEventData{

	idFTPevent   : string;
	start        : string;
	end          : string;
	title        : string;
	description  : string;
	thumbnail    : string;
	bucket       : string;
	brand        : string;
	gdpr         : boolean;
	compliance   : number;
	license      : string;
	finalCustomer: string;

}
export interface PhotoboothEventManagerEvent extends PhotoboothEventManagerDetails{

	idFTPevent   : string;
	configuration: Record<string, any>;
	publish      : Record<string, any>;
	data         : PhotoboothEventManagerEventData;

}

export interface PhotoboothEventManager extends PhotoboothEventManagerDetails {

	license                : number;
	services               : PhotoboothEventManagerServices;
	greenscreen            : PhotoboothEventManagerGreenScreen;
	modes                  : PhotoboothEventManagerModes;
	ee                     : EventEngine;
	event                  : PhotoboothEventManagerEvent;
	orderparams            : {[key: string]: any};

}
