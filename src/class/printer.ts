import {EventEngineMedia, EventEnginePrinter, EventEngineServer} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import printHttpMethods from '../print/print-http';
import {Server} from './server';

const DEFAULT_SHEETS_NUMBER = 100;

export class Printer extends Server{

	simulate       : EventEnginePrinter['simulate'];
	off            : EventEnginePrinter['off'];
	on             : EventEnginePrinter['on'];
	autohide       : EventEnginePrinter['autohide'];
	sheets         : EventEnginePrinter['sheets'];
	limit          : EventEnginePrinter['limit'];
	paper          : EventEnginePrinter['paper'];
	sizes          : EventEnginePrinter['sizes'];
	correspondances: EventEnginePrinter['correspondances'];
	status         : EventEnginePrinter['status'];
	ok             : EventEnginePrinter['ok'];

	constructor(server: EventEngineServer, printer: EventEnginePrinter){

		super('Printer', server);

		this.simulate        = printer.simulate;
		this.off             = printer.off;
		this.on              = printer.on;
		this.autohide        = printer.autohide;
		this.sheets          = printer.sheets;
		this.limit           = printer.limit;
		this.paper           = printer.paper;
		this.sizes           = printer.sizes;
		this.correspondances = printer.correspondances;
		this.status          = printer.status;
		this.ok              = printer.ok;

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

		if(this.simulate === true){

			this.sheets = DEFAULT_SHEETS_NUMBER;
			this.ok     = true;

		}else if(this.simulate === false){

			if(this.off){

				isAbleToPrint = false;

			}else{

				try{

					const numberOfLeftPrintSheets = await this.numberOfLeftPrintSheets();
					const isOK                    = await this.isOK();

					this.sheets = numberOfLeftPrintSheets.data;
					this.ok     = isOK;

					if((!numberOfLeftPrintSheets.data || !isOK || this.limit <= 0) && this.autohide){

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
