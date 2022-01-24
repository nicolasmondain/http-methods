import {EventEngineServer} from '../@types/event-engine';

export class Server {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	constructor(options: EventEngineServer){

		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = `${options.protocol}://${options.server}:${options.port}`;

	}

}
