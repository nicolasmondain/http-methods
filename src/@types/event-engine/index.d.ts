export interface EventEngineGreenscreen {

	background  : string;
	R           : number;
	G           : number;
	B           : number;
	angle       : number;
	noise       : number;
	livefeedOnly: boolean;

}

export interface EventEngineServer {

	server  : string;
	port    : number;
	protocol: string;
	env?    : 'production'|'staging'|'development';

}

export type EventEngineServerType = 'Photobooth' | 'CameraEos' | 'CameraIos' | 'CameraWebcam' | 'Printer' | 'Payment' | 'Api';

export interface EventEngineServerExpectation {

	status : number;
	method : 'toBeEqualTo' | 'toBeGreaterThan' | 'toBeLessThan' | 'toBeTypeof' | 'toMatch' | 'toBeNull';
	nested : string;
	compare: number|string|boolean|undefined|null;

}

export type EventEngineServerExpectations = Array<EventEngineServerExpectation>;

export interface EventEngineStreamFrame {

	height? : number;
	width?  : number;
	ratio?  : number;

}

export interface EventEngineStreamFocus {

	setTo: string;
	value: number;

}

export interface EventEngineStreamExposure {

	setTo   : string;
	duration: number;
	iso     : string;
	bias    : number;

}

export interface EventEngineStreamWhiteBalance {

	setTo      : string;
	temperature: number;
	tint       : number;

}

export interface EventEngineStream {

	name         : string;
	rank         : number;
	orientation? : string;
	frame        : EventEngineStreamFrame;
	focus        : EventEngineStreamFocus;
	exposure     : EventEngineStreamExposure;
	whiteBalance : EventEngineStreamWhiteBalance;

}

export interface EventEnginePrinterRestrictions {

	limit?          : number;
	paper?          : string;
	sizes?          : Array<Array>;
	correspondances?: Array<string>;

}

export interface EventEnginePrinter {

	simulate       : boolean;
	off            : boolean;
	on             : boolean;
	autohide       : boolean;
	sheets         : number;
	limit          : number;
	paper          : string;
	sizes          : Array<Array>;
	correspondances: Array<string>;
	status         : string;
	ok             : boolean;
	able           : boolean;

}

export interface EventEnginePayment {

	simulate: boolean;
	qrcode  : boolean;

}

export interface EventEngineNeedHardware {

	photo        : boolean;
	slowmotion   : boolean;
	video        : boolean;
	printer      : boolean;
	orientation? : 'portrait'|'landscape';

}

export interface EventEngineURLParams {

	[version: string]                : string;
	[idEvent: string]                : string;
	[idBooth: string]                : number;
	[license: string]                : number;
	[width: string]                  : number;
	[height: string]                 : number;
	[config: string]      					 : string;
	[capture: string]     					 : string;
	[contactless: string] 					 : string;
	[autoplay: boolean]              : string;
	[orderparams: string]            : string;
	[framework?: boolean]            : 'xamarin' | 'maui';

}

type EventEngineMediaMetaData = {

	file      : string;
	type      : string;
	idFTPevent: string;
	idBooth   : string;
	idSession : string;

};

type EventEngineIncrustation = {

	x: number;
	y: number;
	w: number;
	h: number;
	a: number;
	r: number;

};

export interface EventEngineMedia {

	name : string;
	user : number;
	index: number;
	redos: number;
	type : string;
	types: Array<string>;
	ext  : string;
	src  : string;
	path : string;
	b64  : string;
	size : {

		height: number,
		width : number

	};

	element: {

		preview : string;
		filter  : string;
		print   : string;
		video   : string;
		branding: string;
		orignal : Array<string>;

	};

	status: {

		printed     : number;
		print       : boolean;
		cancelled   : boolean;
		deleted     : boolean;
		branding    : boolean;
		original    : boolean;
		intermediate: boolean;
		main        : boolean;
		preview     : boolean;

	};

	meta: {

		origin : EventEngineMediaMetaData;
		current: EventEngineMediaMetaData;

	};

}
