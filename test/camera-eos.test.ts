import {mediaStream} from '../src/@types/event-engine/mediaStream';

const CAMERA:mediaStream = {

	who     : 'localhost',
	port    : 8084,
	protocol: 'http',
	url     : 'http://localhost:8084',

	name        : 'CanonEOS1300D',
	rank        : 1,
	orientation : 'Default',
	frame       : {height: 1080, width: 720},
	focus       : {setTo: '', value: ''},
	exposure    : {setTo: '', duration: 0, iso: '', bias: ''},
	whiteBalance: {setTo: '', temperature: '', tint: ''}

};

export default CAMERA;
