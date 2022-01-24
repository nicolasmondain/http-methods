import {EventEngineMedia, EventEnginePrinter} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import printHttpMethods from '../print/print-http';

export class Printer {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autohide: boolean;

	constructor(options: EventEnginePrinter){

		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = options.url;

		this.simulate = options.simulate;
		this.off      = options.off;
		this.on       = options.on;
		this.autohide = options.autohide;

	}

	async numberOfLeftPrintSheets(): Promise<httpResponse>{

		const numberOfLeftPrintSheets = await printHttpMethods.numberOfLeftPrintSheets(this);

		return numberOfLeftPrintSheets;

	}

	morePrints(file: EventEngineMedia, copies: number): Promise<httpResponse>{

		const morePrints = printHttpMethods.morePrints(this, file, copies);

		return morePrints;


	}

	print(file: EventEngineMedia, copies: number, simulate: boolean): Promise<httpResponse>{

		const print = printHttpMethods.print(this, file, copies, simulate);

		return print;

	}

}
