import {EventEngineMedia, EventEnginePrinter, EventEngineServer, EventEngineStream, EventEngineURLParams} from '../@types/event-engine';
import {PhotoboothEventManager, PhotoboothEventManagerScreen} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import * as Bowser from 'bowser';
import {Camera} from './camera';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Printer} from './printer';
import {Server} from './server';
import webHttpMethods from '../web/web-http';

const bowser = Bowser.getParser(window.navigator.userAgent);

export class Photobooth extends Server{

	id      : number;
	em      : PhotoboothEventManager;
	screen  : PhotoboothEventManagerScreen;
	cameras : Array<Camera>;
	printers: Array<Printer>;
	browser : Bowser.Parser.BrowserDetails;
	platform: Bowser.Parser.PlatformDetails;
	os      : Bowser.Parser.OSDetails;
	engine  : Bowser.Parser.EngineDetails;

	constructor(server: EventEngineServer){

		super(server);

		this.id = 0;
		this.em = {

			version    : '',
			license    : 0,
			directory  : '',
			services   : {},
			greenscreen: {},
			modes      : {

				launch       : 'normal',
				contactless  : false,
				configuration: false,
				screenshot   : false

			},

			timeDifferenceWithCloud: 0

		};

		this.platform = bowser.getPlatform();
		this.browser  = bowser.getBrowser();
		this.os 		  = bowser.getOS();
		this.engine   = bowser.getEngine();
		this.screen   = {width: 0, height: 0};
		this.cameras  = [];
		this.printers = [];

	}

	async init(params: EventEngineURLParams): Promise<void>{

		const responses: Array<httpResponse> = await Promise.all([this.whatMode(), this.appDirectory(), this.services(), this.greenScreen()]);

		if(responses.every((r) => httpStatus.isOK(r.status))){

			this.em.modes.launch = responses[0].data.toLowerCase();
			this.em.directory    = responses[1].data;
			this.em.services     = responses[2].data;
			this.em.greenscreen  = responses[3].data;

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

	addPrinter(server: EventEngineServer, printer: EventEnginePrinter): number{

		const printersLength = this.printers.push(new Printer(server, printer));
		const printerIndex   = printersLength - 1;

		return printerIndex;

	}

	addPrinters(): void{

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

	hasPrinter(): boolean{

		return this.printers.length > 0;

	}

	async callPrinters(call: (args: Array<unknown>) => Promise<httpResponse>, args: Array<unknown>): Promise<Array<unknown>>{ // eslint-disable-line no-unused-vars

		const callCameras = await Promise.all(this.printers.map((e) => call.bind(e)(args)));

		return callCameras;

	}

	addCamera(server: EventEngineServer, camera: EventEngineStream): number{

		const camerasLength = this.cameras.push(new Camera(server, camera));
		const cameraIndex   = camerasLength - 1;

		this.cameras[cameraIndex].updateCameraFrame();

		return cameraIndex;

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

	hasCamera(): boolean{

		return this.cameras.length > 0;

	}

	async callCameras(call: (args: Array<unknown>) => Promise<httpResponse>, args: Array<unknown>): Promise<Array<unknown>>{ // eslint-disable-line no-unused-vars

		const callCameras = await Promise.all(this.cameras.map((e) => call.bind(e)(args)));

		return callCameras;

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

	async greenScreen(): Promise<httpResponse>{

		const greenScreen = await webHttpMethods.greenScreen(this);

		return greenScreen;

	}

	async retrieveImageFromUrlAndSaveIt(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		const version = await webHttpMethods.retrieveImageFromUrlAndSaveIt(this, camera, file);

		return version;

	}

}
