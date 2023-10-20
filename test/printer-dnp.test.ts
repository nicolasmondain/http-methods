import {EventEnginePrinter, EventEngineServer} from '../src/@types/event-engine';
import {PrinterClassParams} from '../src/@types/http-methods';

const SERVER: EventEngineServer = {

	server  : 'localhost',
	port    : 8080,
	protocol: 'http'

};

const OPTIONS: EventEnginePrinter = {

	simulate: false,
	off     : false,
	on      : true,
	autohide: false,
	sheets  : 1,
	limit   : 9999,
	status  : '',
	ok      : true,
	able    : true

};

const PARAMS:PrinterClassParams = {

	SERVER,
	OPTIONS

};

export default PARAMS;
