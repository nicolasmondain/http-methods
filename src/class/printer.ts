import {EventEnginePrinter} from '../@types/event-engine';
import {Hardware} from './hardware';
import printHttpMethods from '../print/print-http';

export class Printer extends Hardware {

	constructor(options: EventEnginePrinter){

		super(options, printHttpMethods);

	}

}
