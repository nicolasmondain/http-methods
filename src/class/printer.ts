import {EventEngineMedia, EventEnginePrinter, EventEngineServer} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import printHttpMethods from '../print/print-http';
import {Server} from './server';

export class Printer extends Server{

	simulate: boolean;
	off     : boolean;
	on      : boolean;
	autohide: boolean;
	sheets  : number;
	status  : string;
	ok      : boolean;

	constructor(server: EventEngineServer, printer: EventEnginePrinter){

		super('Printer', server);

		this.simulate = printer.simulate;
		this.off      = printer.off;
		this.on       = printer.on;
		this.autohide = printer.autohide;
		this.sheets   = printer.sheets;
		this.status   = printer.status;
		this.ok       = printer.ok;

	}

	async isOK(): Promise<boolean>{

		let isOK = false;

		const status = await this.dnpStatus();

		if(typeof status.data === 'string'){

			this.status = status.data;

			isOK = status.data.substring(0, 2).toUpperCase() === 'OK';

		}

		return isOK;

	}

	async isAbleToPrint(): Promise<boolean>{

		let isAbleToPrint = true;

		if(this.simulate === false){

			if(this.off){

				isAbleToPrint = false;

			}else{

				try{

					const numberOfLeftPrintSheets = await this.numberOfLeftPrintSheets();
					const isOK                    = await this.isOK();

					this.sheets = numberOfLeftPrintSheets.data;
					this.ok     = isOK;

					if((!numberOfLeftPrintSheets.data || !isOK) && this.autohide){

						isAbleToPrint = false;

					}

				}catch(error){

					isAbleToPrint = false;

				}

			}

		}

		return isAbleToPrint;

	}

	async numberOfLeftPrintSheets(): Promise<httpResponse>{

		const numberOfLeftPrintSheets = await printHttpMethods.numberOfLeftPrintSheets(this);

		this.httpResponseCheck(numberOfLeftPrintSheets);

		return numberOfLeftPrintSheets;

	}

	async dnpStatus(): Promise<httpResponse>{

		const dnpStatus = await printHttpMethods.dnpStatus(this);

		this.httpResponseCheck(dnpStatus);

		return dnpStatus;

	}

	async morePrints(file: EventEngineMedia, copies: number): Promise<httpResponse>{

		const morePrints = await printHttpMethods.morePrints(this, file, copies);

		this.httpResponseCheck(morePrints);

		return morePrints;


	}

	async print(file: EventEngineMedia, copies: number): Promise<httpResponse>{

		const print = await printHttpMethods.print(this, file, copies, this.simulate);

		this.httpResponseCheck(print);

		return print;

	}

}
