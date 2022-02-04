import {EventEngineMedia, EventEnginePrinter, EventEngineServer, EventEngineStream, EventEngineURLParams} from '../@types/event-engine';
import {PhotoboothEventManager, PhotoboothEventManagerScreen} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import * as Bowser from 'bowser';
import {Camera} from './camera';
import {CameraEos} from './camera-eos';
import {CameraIos} from './camera-ios';
import {CameraWebcam} from './camera-webcam';
import {PhotoboothEvent} from './event';
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
	browser : Bowser.Parser.BrowserDetails | null;
	platform: Bowser.Parser.PlatformDetails | null;
	os      : Bowser.Parser.OSDetails | null;
	engine  : Bowser.Parser.EngineDetails | null;

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

			timeDifferenceWithCloud: 0,

			ee: {

				version  : '',
				directory: ''

			},

			event: {

				version   : '',
				directory : '',
				idFTPevent: ''

			}

		};

		this.platform = this.server === 'localhost' ? bowser.getPlatform() : null;
		this.browser  = this.server === 'localhost' ? bowser.getBrowser() : null;
		this.os 		  = this.server === 'localhost' ? bowser.getOS() : null;
		this.engine   = this.server === 'localhost' ? bowser.getEngine() : null;
		this.screen   = {width: 0, height: 0};
		this.cameras  = [];
		this.printers = [];

	}

	private init1(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.id     = params.idBooth;
		this.screen = {width: Number(params.width), height: Number(params.height)};
		this.os     = Object.assign(this.os, {name: responses[4].data.toLowerCase()});

	}

	private init2(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.em.directory               = responses[1].data;
		this.em.services                = responses[2].data;
		this.em.greenscreen             = responses[3].data;
		this.em.version                 = params.version;
		this.em.license                 = Number(params.license);
		this.em.timeDifferenceWithCloud = params.timeDifferenceWithCloud ? Number(params.timeDifferenceWithCloud) : 0;

	}

	private init3(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.em.modes.launch        = responses[0].data.toLowerCase();
		this.em.modes.contactless   = params.contactless.toLowerCase() === 'true';
		this.em.modes.configuration = params.config.toLowerCase() === 'on';
		this.em.modes.screenshot    = params.capture.toLowerCase() === 'on';

	}

	private init4(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.em.event = new PhotoboothEvent({

			idFTPevent: params.idEvent,
			directory : `${this.em.directory}/event/${this.em.event.idFTPevent}/`,
			version   : ''

		});

	}

	async init(params: EventEngineURLParams): Promise<void>{

		const responses: Array<httpResponse> = await Promise.all([this.whatMode(), this.appDirectory(), this.services(), this.greenScreen(), this.whatSystem()]);

		Server.httpResponsesCheck(responses);

		this.init1(responses, params);
		this.init2(responses, params);
		this.init3(responses, params);
		this.init4(responses, params);

		this.addCameras();
		this.addPrinters();

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

		const callPrinters = await Promise.all(this.printers.map((e) => call.bind(e)(args)));

		Server.httpResponsesCheck(callPrinters);

		return callPrinters;

	}

	addCamera(server: EventEngineServer, camera: EventEngineStream): number{

		let cam = {} as Camera;

		const DEFAULT_PORT = 8084;

		if(server.port === DEFAULT_PORT && this.os?.name === 'windows'){

			cam = new CameraEos(server, camera);

		}else if(server.port === DEFAULT_PORT && this.os?.name === 'ios'){

			cam = new CameraIos(server, camera);

		}else{

			cam = new CameraWebcam(server, camera);

		}

		const camerasLength = this.cameras.push(cam);
		const cameraIndex   = camerasLength - 1;

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

		Server.httpResponsesCheck(callCameras);

		return callCameras;

	}

	async appDirectory(): Promise<httpResponse>{

		const appDirectory = await webHttpMethods.appDirectory(this);

		Server.httpResponseCheck(appDirectory);

		return appDirectory;

	}

	async launchMediaServer(): Promise<httpResponse>{

		const launchMediaServer = await webHttpMethods.launchMediaServer(this);

		Server.httpResponseCheck(launchMediaServer);

		return launchMediaServer;

	}

	async log(string: string): Promise<httpResponse>{

		const log = await webHttpMethods.log(this, string);

		Server.httpResponseCheck(log);

		return log;

	}

	async whatMode(): Promise<httpResponse>{

		const whatMode = await webHttpMethods.whatMode(this);

		Server.httpResponseCheck(whatMode);

		return whatMode;

	}

	async whatSystem(): Promise<httpResponse>{

		const whatSystem = await webHttpMethods.whatSystem(this);

		Server.httpResponseCheck(whatSystem);

		return whatSystem;

	}

	async services(): Promise<httpResponse>{

		const services = await webHttpMethods.services(this);

		Server.httpResponseCheck(services);

		return services;

	}

	async greenScreen(): Promise<httpResponse>{

		const greenScreen = await webHttpMethods.greenScreen(this);

		Server.httpResponseCheck(greenScreen);

		return greenScreen;

	}

	async retrieveImageFromUrlAndSaveIt(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		const version = await webHttpMethods.retrieveImageFromUrlAndSaveIt(this, camera, file);

		Server.httpResponseCheck(version);

		return version;

	}

	async retrieveDataFileFromIP(ip: string, id: string, file: EventEngineMedia): Promise<httpResponse>{

		const retrieveDataFileFromIP = await webHttpMethods.retrieveDataFileFromIP(this, ip, id, file);

		Server.httpResponseCheck(retrieveDataFileFromIP);

		return retrieveDataFileFromIP;

	}

	async saveImage(file: EventEngineMedia, base64: string): Promise<httpResponse>{

		const saveImage = await webHttpMethods.saveImage(this, file, base64);

		Server.httpResponseCheck(saveImage);

		return saveImage;

	}

	async doesFileExist(file: EventEngineMedia): Promise<httpResponse>{

		const doesFileExist = await webHttpMethods.doesFileExist(this, file);

		Server.httpResponseCheck(doesFileExist);

		return doesFileExist;

	}

	async writeTextFileInSession(id: string, file: EventEngineMedia, text: string): Promise<httpResponse>{

		const writeTextFileInSession = await webHttpMethods.writeTextFileInSession(this, id, file, text);

		Server.httpResponseCheck(writeTextFileInSession);

		return writeTextFileInSession;

	}

	async writeTextFile(file: EventEngineMedia, text: string): Promise<httpResponse>{

		const writeTextFile = await webHttpMethods.writeTextFile(this, file, text);

		Server.httpResponseCheck(writeTextFile);

		return writeTextFile;

	}

	async copyFile(source: EventEngineMedia, destination: EventEngineMedia): Promise<httpResponse>{

		const copyFile = await webHttpMethods.copyFile(this, source, destination);

		Server.httpResponseCheck(copyFile);

		return copyFile;

	}

	async deleteSession(id: string): Promise<httpResponse>{

		const deleteSession = await webHttpMethods.deleteSession(this, id);

		Server.httpResponseCheck(deleteSession);

		return deleteSession;

	}

	async deleteFilesInSession(id: string, files: string): Promise<httpResponse>{

		const deleteFilesInSession = await webHttpMethods.deleteFilesInSession(this, id, files);

		Server.httpResponseCheck(deleteFilesInSession);

		return deleteFilesInSession;

	}

}
