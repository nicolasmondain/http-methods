import {EventEngineStream} from '../src/@types/event-engine';

const CAMERA:EventEngineStream = {

	who     : 'localhost',
	port    : 8097,
	protocol: 'http',
	url     : 'http://localhost:8097',

	name        : 'c922 Pro Stream Webcam',
	rank        : 1,
	orientation : 'Default',
	frame       : {height: 1080, width: 720},
	focus       : {setTo: '', value: ''},
	exposure    : {setTo: '', duration: 0, iso: '', bias: ''},
	whiteBalance: {setTo: '', temperature: '', tint: ''}

};

export default CAMERA;
