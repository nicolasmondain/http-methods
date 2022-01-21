import {EventEngineMedia} from '../src/@types/event-engine';

const FILE:EventEngineMedia = {

	name : 'SHOOT-Y221_20190215_001_3631_20211123204338929-u0-r0-i0.jpg',
	user : 0,
	index: 0,
	redos: 0,
	type : '',
	types: [''],
	ext  : '',
	src  : '',
	path : '',
	b64  : '',
	size : {

		height: 0,
		width : 0

	},

	element: {

		preview : '',
		filter  : '',
		print   : '',
		video   : '',
		branding: '',
		orignal : ['']

	},

	status: {

		printed     : 0,
		print       : false,
		cancelled   : false,
		deleted     : false,
		branding    : false,
		original    : false,
		intermediate: false,
		main        : false,
		preview     : false

	},

	meta: {

		origin: {

			file      : '',
			type      : '',
			idFTPevent: '',
			idBooth   : '',
			idSession : ''

		},
		current: {

			file      : '',
			type      : '',
			idFTPevent: '',
			idBooth   : '',
			idSession : ''

		}

	}

};

export default FILE;
