import {PhotoboothEventManagerEvent, PhotoboothEventManagerEventData} from '../@types/http-methods';

export class PhotoboothEvent{

	idFTPevent   : string;
	field        : string;
	prefix       : string;
	year         : string;
	month        : string;
	version      : string;
	directory    : string;
	configuration: Record<string, any>;
	publish      : Record<string, any>;
	data         : PhotoboothEventManagerEventData;
	language     : string;


	constructor(options: PhotoboothEventManagerEvent){

		const {idFTPevent} = options;
		const split        = idFTPevent.split('_');
		const field        = split[0];
		const match        = field.match(/(?<prefix>[A-Z]{2,10})/gu);

		this.idFTPevent    = idFTPevent;
		this.field         = field;
		this.prefix        = match ? match[0] : field;
		this.year          = split[1].slice(0, 4); // eslint-disable-line no-magic-numbers
		this.month         = split[1].slice(4, 6); // eslint-disable-line no-magic-numbers
		this.version       = options.version;
		this.directory     = options.directory;
		this.configuration = options.configuration;
		this.publish       = options.publish;
		this.data          = options.data;
		this.language      = this.configuration.globalData.event_LANGUAGE;

	}

	isMediaNetwork(): boolean{

		return this.prefix === 'MEDIAP';

	}

}
