import {EventEngineServer, EventEngineServerType, EventEngineStream} from '../src/@types/event-engine';
import {CameraClassParams} from '../src/@types/http-methods';

const FRAME_HEIGHT = 1080;
const FRAME_WIDTH  = 720;

const TYPE: EventEngineServerType = 'CameraWebcam';

const SERVER: EventEngineServer = {

	server  : 'localhost',
	port    : 8097,
	protocol: 'http'

};

const OPTIONS:EventEngineStream = {

	name        : 'c922 Pro Stream Webcam',
	rank        : 1,
	orientation : 'Default',
	frame       : {height: FRAME_HEIGHT, width: FRAME_WIDTH, ratio: FRAME_HEIGHT / FRAME_WIDTH},
	focus       : {setTo: '', value: 0},
	exposure    : {setTo: '', duration: 0, iso: '', bias: 0},
	whiteBalance: {setTo: '', temperature: 0, tint: 0}

};

const PARAMS:CameraClassParams = {

	SERVER,
	OPTIONS,
	TYPE

};

export default PARAMS;
