type mediaMetaData = {

	file      : string;
	type      : string;
	idFTPevent: string;
	idBooth   : string;
	idSession : string;

};

export interface eventEngineMedia {

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
