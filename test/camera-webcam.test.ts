import {EventEngineServer, EventEngineStream} from '../src/@types/event-engine';
import {CameraClassParams} from '../src/@types/http-methods';

const FRAME_HEIGHT = 1080;
const FRAME_WIDTH  = 720;

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
	focus       : {setTo: '', value: ''},
	exposure    : {setTo: '', duration: 0, iso: '', bias: ''},
	whiteBalance: {setTo: '', temperature: '', tint: ''}

};

const PARAMS:CameraClassParams = {

	SERVER,
	OPTIONS

};

export default PARAMS;
