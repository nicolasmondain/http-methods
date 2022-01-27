import {EventEngineMedia, EventEnginePrinter, EventEngineServer, EventEngineStream, EventEngineURLParams} from '../@types/event-engine';
import {PhotoboothEventManager, PhotoboothEventManagerScreen} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import {Camera} from './camera';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Printer} from './printer';
import {Server} from './server';
import webHttpMethods from '../web/web-http';

export class Photobooth extends Server{

	id      : number;
	em      : PhotoboothEventManager;
	screen  : PhotoboothEventManagerScreen;
	cameras : Array<Camera>;
	printers: Array<Printer>;

	constructor(server: EventEngineServer){

		super(server);

		this.id = 0;
		this.em = {

			version  : '',
			license  : 0,
			directory: '',
			services : {},
			modes    : {

				launch       : 'normal',
				contactless  : false,
				configuration: false,
				screenshot   : false

			},

			timeDifferenceWithCloud: 0

		};

		this.screen   = {width: 0, height: 0};
		this.cameras  = [];
		this.printers = [];

	}

	async init(params: EventEngineURLParams): Promise<void>{

		const responses: Array<httpResponse> = await Promise.all([this.whatMode(), this.appDirectory(), this.services()]);

		if(responses.every((r) => httpStatus.isOK(r.status))){

			this.em.modes.launch = responses[0].data.toLowerCase();
			this.em.directory    = responses[1].data;
			this.em.services     = responses[2].data;

			this.id                         = params.id;
			this.screen                     = {width: params.width, height: params.height};
			this.em.version                 = params.version;
			this.em.license                 = params.license;
			this.em.modes.contactless       = params.contactless;
			this.em.modes.configuration     = params.configuration;
			this.em.modes.screenshot        = params.screenshot;
			this.em.timeDifferenceWithCloud = params.timeDifferenceWithCloud;

			this.addCameras();
			this.addPrinters();

		}else{

			throw new Error(JSON.stringify(responses));

		}

	}

	addPrinter(server: EventEngineServer, printer: EventEnginePrinter): void{

		this.printers.push(new Printer(server, printer));

	}

	addCamera(server: EventEngineServer, camera: EventEngineStream): void{

		this.cameras.push(new Camera(server, camera));

	}

	addPrinters(){

		const {print} = this.em.services;

		if(print){

			const server  = {server: print.who, port: 8080, protocol: 'http'};
			const printer = {

				simulate: print.simulate,
				off     : print.off,
				on      : print.on,
				autohide: print.autoHide

			};

			this.addPrinter(server, printer);

		}

	}

	addCameras(): void{

		const {mediasStream} = this.em.services;

		if(mediasStream && Array.isArray(mediasStream)){

			for(let i = 0; i < mediasStream.length; i += 1){

				const c = mediasStream[i];

				const server = {server: c.who, port: Number(c.port), protocol: 'http'};
				const frame  = {height: Number(c.frameHeight), width: Number(c.frameWidth)};
				const camera = {

					name        : c.name,
					rank        : Number(c.rank),
					focus       : c.focus,
					exposure    : c.exposure,
					whiteBalance: c.whiteBalance,
					orientation : c.orientation,
					frame       : {height: frame.height, width: frame.width, ratio: frame.height / frame.width}

				};

				this.addCamera(server, camera);

			}

		}

	}

	async whatMode(): Promise<httpResponse>{

		const whatMode = await webHttpMethods.whatMode(this);

		return whatMode;

	}

	async appDirectory(): Promise<httpResponse>{

		const appDirectory = await webHttpMethods.appDirectory(this);

		return appDirectory;

	}

	async services(): Promise<httpResponse>{

		const services = await webHttpMethods.services(this);

		return services;

	}

	async retrieveImageFromUrlAndSaveIt(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		const version = await webHttpMethods.retrieveImageFromUrlAndSaveIt(this, camera, file);

		return version;

	}

}
