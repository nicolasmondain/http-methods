import {EventEngineServer} from '../src/@types/event-engine';
import {PhotoboothClassParams} from '../src/@types/http-methods';

const SERVER: EventEngineServer = {

	server  : 'localhost',
	port    : 8080,
	protocol: 'http'

};

const PARAMS:PhotoboothClassParams = {

	SERVER

};

export default PARAMS;
