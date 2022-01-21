import {EventEnginePrinter} from '../src/@types/event-engine';

const PRINTER:EventEnginePrinter = {

	server  : 'localhost',
	port    : 8080,
	protocol: 'http',
	url     : 'http://localhost:8080',
	simulate: false,
	off     : false,
	on      : true,
	autohide: false

};

export default PRINTER;
