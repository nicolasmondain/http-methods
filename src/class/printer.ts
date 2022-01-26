import {EventEngineMedia, EventEnginePrinter, EventEngineServer} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import printHttpMethods from '../print/print-http';
import {Server} from './server';

export class Printer extends Server{

	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autohide: boolean;

	constructor(server: EventEngineServer, printer: EventEnginePrinter){

		super(server);

		this.simulate = printer.simulate;
		this.off      = printer.off;
		this.on       = printer.on;
		this.autohide = printer.autohide;

	}

	async isAbleToPrint(): Promise<boolean>{

		let isAbleToPrint = true;

		if(this.simulate === false){

			if(this.off){

				isAbleToPrint = false;

			}else{

				const paper = await this.numberOfLeftPrintSheets();

				if(!paper.data && this.autohide){

					isAbleToPrint = false;

				}

			}

		}

		return isAbleToPrint;

	}

	async numberOfLeftPrintSheets(): Promise<httpResponse>{

		const numberOfLeftPrintSheets = await printHttpMethods.numberOfLeftPrintSheets(this);

		return numberOfLeftPrintSheets;

	}

	async morePrints(file: EventEngineMedia, copies: number): Promise<httpResponse>{

		const morePrints = await printHttpMethods.morePrints(this, file, copies);

		return morePrints;


	}

	async print(file: EventEngineMedia, copies: number): Promise<httpResponse>{

		const print = await printHttpMethods.print(this, file, copies, this.simulate);

		return print;

	}

}
