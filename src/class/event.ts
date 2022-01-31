import {PhotoboothEventManagerEvent} from '../@types/http-methods';

export class PhotoboothEvent{

	idFTPevent: string;
	version   : string;
	directory : string;

	constructor(options: PhotoboothEventManagerEvent){

		this.idFTPevent = options.idFTPevent;
		this.version    = options.version;
		this.directory  = options.directory;

	}

	isMediaNetwork(): boolean{

		const start = 0;
		const end   = 0;

		return this.idFTPevent.split('_')[0].substring(start, end) === 'MEDIAP';

	}

}
