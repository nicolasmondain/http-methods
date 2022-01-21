export interface EventEngineGreenscreen {

	background: string;
	R         : number;
	G         : number;
	B         : number;
	angle     : number;
	noise     : number;

}

export interface EventEngineStream {

	who     : string;
	port    : number;
	protocol: string;
	url     : string;

	name        : string;
	rank        : number;
	orientation : string;
	frame       : {height: number, width: number};
	focus       : {setTo: string, value: string};
	exposure    : {setTo: string, duration: number, iso: string, bias: string};
	whiteBalance: {setTo: string, temperature: string, tint: string};

}

export interface EventEnginePrinter {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autohide: boolean;

}

type mediaMetaData = {

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

		origin : mediaMetaData;
		current: mediaMetaData;

	};

}
