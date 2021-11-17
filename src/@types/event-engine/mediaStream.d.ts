export interface mediaStream {

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
