import {EventEngineURLParams} from '../@types/event-engine';
import {WebView} from './webview';

export class EventEngine extends WebView{

	version  : string;
	directory: string;

	constructor(params: EventEngineURLParams){

		super(params);

		this.version   = '';
		this.directory = '';

	}

}
