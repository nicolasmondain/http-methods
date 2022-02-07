export interface EventEngineGreenscreen {

	background: string;
	R         : number;
	G         : number;
	B         : number;
	angle     : number;
	noise     : number;

}

export interface EventEngineServer {

	server  : string;
	port    : number;
	protocol: string;

}

export interface EventEngineServerExpectation {

	status : number;
	method : 'toBeEqualTo' | 'toBeGreaterThan' | 'toBeLessThan' | 'toBeTypeof' | 'toMatch' | 'toBeNull';
	nested : string;
	compare: number|string|boolean|undefined|null;

}

export type EventEngineServerExpectations = Array<EventEngineServerExpectation>;

export interface EventEngineStreamFrame {

	height: number;
	width : number;
	ratio : number;

}

export interface EventEngineStreamFocus {

	setTo: string;
	value: string;

}

export interface EventEngineStreamExposure {

	setTo   : string;
	duration: number|null;
	iso     : string;
	bias    : string;

}

export interface EventEngineStreamWhiteBalance {

	setTo      : string;
	temperature: string;
	tint       : string;

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

export interface EventEnginePrinter {

	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autohide: boolean;

}

export interface EventEngineURLParams {

	[version: string]                : string;
	[idEvent: string]                : string;
	[idBooth: string]                : number;
	[license: string]                : number;
	[width: string]                  : number;
	[height: string]                 : number;
	[timeDifferenceWithCloud: string]: number;
	[config: string]      					 : string;
	[capture: string]     					 : string;
	[contactless: string] 					 : string;
	[errorInSession?: string]        : string;

}

type EventEngineMediaMetaData = {

	file      : string;
	type      : string;
	idFTPevent: string;
	idBooth   : string;
	idSession : string;

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
