import {EventEngineMedia, EventEngineNeedHardware, EventEnginePrinter, EventEngineServer, EventEngineStream, EventEngineURLParams} from '../@types/event-engine';
import {PhotoboothEventManager, PhotoboothEventManagerEvent, PhotoboothEventManagerMediaStream, PhotoboothEventManagerScreen} from '../@types/http-methods';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import * as Bowser from 'bowser';
import {Camera} from './camera';
import {CameraEos} from './camera-eos';
import {CameraIos} from './camera-ios';
import {CameraWebcam} from './camera-webcam';
import {EventEngine} from './event-engine';
import {PhotoboothEvent} from './event';
import {Printer} from './printer';
import {Server} from './server';
import webHttpMethods from '../web/web-http';

const bowser = Bowser.getParser(window.navigator.userAgent);

export class Photobooth extends Server{

	id       : number;
	em       : PhotoboothEventManager;
	screen   : PhotoboothEventManagerScreen;
	cameras  : Array<CameraEos|CameraIos|CameraWebcam>;
	recorders: Array<CameraEos|CameraIos|CameraWebcam>;
	printers : Array<Printer>;
	use      : {camera: number, recorder: number, printer: number};
	browser  : Bowser.Parser.BrowserDetails | null;
	platform : Bowser.Parser.PlatformDetails | null;
	os       : Bowser.Parser.OSDetails | null;
	engine   : Bowser.Parser.EngineDetails | null;

	constructor(server: EventEngineServer){

		super('Photobooth', server);

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

			ee: {} as EventEngine,

			event: {

				version   : '',
				directory : '',
				idFTPevent: ''

			} as PhotoboothEventManagerEvent

		};

		this.platform  = this.server === 'localhost' ? bowser.getPlatform() : null;
		this.browser   = this.server === 'localhost' ? bowser.getBrowser() : null;
		this.os        = this.server === 'localhost' ? bowser.getOS() : null;
		this.engine    = this.server === 'localhost' ? bowser.getEngine() : null;
		this.screen    = {width: 0, height: 0, orientation: ''};
		this.cameras   = [];
		this.recorders = [];
		this.printers  = [];
		this.use       = {camera: 0, recorder: 0, printer: 0};

	}

	static getCameraData(stream: PhotoboothEventManagerMediaStream): {server: EventEngineServer, camera: EventEngineStream}{

		const server = {server: stream.who, port: Number(stream.port), protocol: 'http'};
		const frame  = {height: Number(stream.frameHeight || 0), width: Number(stream.frameWidth || 0)};
		const flip   = stream.orientation?.includes('Flip');
		const camera = {

			name        : stream.name,
			rank        : Number(stream.rank),
			focus       : {setTo: stream.focus.setTo, value: Number(stream.focus.value)},
			exposure    : {setTo: stream.exposure.setTo, duration: Number(stream.exposure.duration), iso: stream.exposure.iso, bias: Number(stream.exposure.bias)},
			whiteBalance: {setTo: stream.whiteBalance.setTo, temperature: Number(stream.whiteBalance.temperature), tint: Number(stream.whiteBalance.tint)},
			orientation : stream.orientation,
			frame       : {

				height        : flip ? frame.width : frame.height,
				width         : flip ? frame.height : frame.width,
				ratio         : flip ? frame.width / frame.height : frame.height / frame.width,
				originalHeight: flip ? frame.width : frame.height,
				originalWidth : flip ? frame.height : frame.width

			}

		};

		return{server, camera};

	}

	private getCameraInstance(server: EventEngineServer, camera: EventEngineStream): CameraEos|CameraIos|CameraWebcam{

		let cam = {} as CameraEos|CameraIos|CameraWebcam;

		const DEFAULT_PORT = 8084;

		if(server.port === DEFAULT_PORT && this.os?.name === 'windows'){

			cam = new CameraEos(server, camera);

		}else if(server.port === DEFAULT_PORT && this.os?.name === 'ios'){

			cam = new CameraIos(server, camera);

		}else{

			cam = new CameraWebcam(server, camera);

		}

		return cam;

	}

	private init1(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.id = Number(params.idBooth);
		this.os = Object.assign(this.os, {name: responses[4].data.toLowerCase()});

		this.screen.width       = Number(params.width);
		this.screen.height      = Number(params.height);
		this.screen.orientation = this.screen.width > this.screen.height ? 'landscape' : 'portrait';

	}

	private init2(responses: Array<httpResponse>, params: EventEngineURLParams): void{

		this.em.directory               = this.formatPath(responses[1].data);
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
			directory : this.formatPath(`${this.em.directory}/event/${params.idEvent}/`),
			version   : ''

		});

	}

	async init(params: EventEngineURLParams): Promise<void>{

		const responses: Array<httpResponse> = await Promise.all([this.whatMode(), this.appDirectory(), this.services(), this.greenScreen(), this.whatSystem()]);

		this.httpResponsesCheck(responses);

		this.init1(responses, params);
		this.init2(responses, params);
		this.init3(responses, params);
		this.init4(responses, params);

		this.em.ee = new EventEngine(params);

		this.addCameras();
		this.addRecorders();
		this.addPrinters();

	}

	formatPath(path: string): string{

		let formatPath = path;

		if(this.os?.name === 'windows'){

			formatPath = formatPath.replace(/\//gu, '\\');

		}else if(this.os?.name === 'ios'){

			formatPath = formatPath.replace(/\\/gu, '/');

		}

		return formatPath;

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
				autohide: print.autoHide,
				sheets  : 0,
				status  : '',
				ok      : true,
				able    : true

			};

			this.addPrinter(server, printer);

		}

	}

	hasPrinter(): boolean{

		return this.printers.length > 0;

	}

	updatePrinterUse(index: number): number{

		this.use.printer = index;

		return index;

	}

	async preparePrinters(): Promise<Array<boolean>>{

		let preparePrinters: Array<boolean> = [];

		if(this.hasPrinter()){

			preparePrinters = await Promise.all(this.printers.map((printer) => printer.isAbleToPrint()));

		}

		return preparePrinters;

	}

	async callPrinters(call: (args: Array<unknown>) => Promise<httpResponse>, args: Array<unknown>): Promise<Array<unknown>>{ // eslint-disable-line no-unused-vars

		const callPrinters = await Promise.all(this.printers.map((e) => call.bind(e)(args)));

		this.httpResponsesCheck(callPrinters);

		return callPrinters;

	}

	addCamera(server: EventEngineServer, camera: EventEngineStream): number{

		const camerasLength = this.cameras.push(this.getCameraInstance(server, camera));
		const cameraIndex   = camerasLength - 1;

		return cameraIndex;

	}

	addCameras(): void{

		const {mediasStream} = this.em.services;

		if(mediasStream && Array.isArray(mediasStream)){

			for(let i = 0; i < mediasStream.length; i += 1){

				const {server, camera} = Photobooth.getCameraData(mediasStream[i]);

				this.addCamera(server, camera);

			}

		}

	}

	hasCamera(): boolean{

		return this.cameras.length > 0;

	}

	updateCameraUse(index: number): number{

		this.use.camera = index;

		return index;

	}

	async prepareCameras(need: EventEngineNeedHardware): Promise<Array<unknown>|void>{

		let startLiveView:Array<httpResponse>   = [];
		let updateEosDetails: Array<httpResponse> = [];

		if(need.photo){

			startLiveView    = await this.callCameras(this.cameras[0].startLiveView, []);
			updateEosDetails = await this.callCameras(this.cameras[0].updateEosDetails, []);

		}

		const prepareCameras = startLiveView.concat(updateEosDetails);

		this.httpResponsesCheck(prepareCameras);

		return prepareCameras;

	}

	async callCameras(call: (args: Array<unknown>) => Promise<httpResponse>, args: Array<unknown>): Promise<Array<httpResponse>>{ // eslint-disable-line no-unused-vars

		const callCameras = await Promise.all(this.cameras.map((e) => call.bind(e)(args)));

		this.httpResponsesCheck(callCameras);

		return callCameras;

	}

	addRecorder(server: EventEngineServer, camera: EventEngineStream): number{

		const recordersLength = this.recorders.push(this.getCameraInstance(server, camera));
		const recordersIndex  = recordersLength - 1;

		return recordersIndex;

	}

	addRecorders(): void{

		const {video} = this.em.services;

		if(video && Array.isArray(video)){

			for(let i = 0; i < video.length; i += 1){

				const {server, camera} = Photobooth.getCameraData(video[i]);

				this.addRecorder(server, camera);

			}

		}

	}

	hasRecorder(): boolean{

		return this.recorders.length > 0;

	}

	updateRecorderUse(index: number): number{

		this.use.recorder = index;

		return index;

	}

	async prepareRecorders(need: EventEngineNeedHardware): Promise<Array<unknown>|void>{

		let setRecordingModeOn:Array<httpResponse>  = [];
		let setRecordingModeOff:Array<httpResponse> = [];
		let setSlowmotion:Array<httpResponse>       = [];

		if(this.os?.name === 'windows'){

			if(need.video && this.recorders[0] instanceof CameraEos){

				setRecordingModeOn = await this.callRecorders(this.recorders[0].setRecordingModeOn, []);

			}else if(this.recorders[0] instanceof CameraEos){

				setRecordingModeOff = await this.callRecorders(this.recorders[0].setRecordingModeOff, []);

			}

		}else if(this.os?.name === 'ios'){

			if(need.slowmotion && this.recorders[0] instanceof CameraIos){

				setSlowmotion = await this.callRecorders(this.recorders[0].setSlowmotion, []);

			}

		}

		const prepareRecorders = setRecordingModeOn.concat(setRecordingModeOff, setSlowmotion);

		this.httpResponsesCheck(prepareRecorders);

		return prepareRecorders;

	}

	async callRecorders(call: (args: Array<unknown>) => Promise<httpResponse>, args: Array<unknown>): Promise<Array<httpResponse>>{ // eslint-disable-line no-unused-vars

		const callRecorders = await Promise.all(this.recorders.map((e) => call.bind(e)(args)));

		this.httpResponsesCheck(callRecorders);

		return callRecorders;

	}

	async appDirectory(): Promise<httpResponse>{

		const appDirectory = await webHttpMethods.appDirectory(this);

		this.httpResponseCheck(appDirectory);

		return appDirectory;

	}

	async launchMediaServer(): Promise<httpResponse>{

		const launchMediaServer = await webHttpMethods.launchMediaServer(this);

		this.httpResponseCheck(launchMediaServer);

		return launchMediaServer;

	}

	async log(string: string): Promise<httpResponse>{

		const log = await webHttpMethods.log(this, string);

		this.httpResponseCheck(log);

		return log;

	}

	async whatMode(): Promise<httpResponse>{

		const whatMode = await webHttpMethods.whatMode(this);

		this.httpResponseCheck(whatMode);

		return whatMode;

	}

	async whatSystem(): Promise<httpResponse>{

		const whatSystem = await webHttpMethods.whatSystem(this);

		this.httpResponseCheck(whatSystem);

		return whatSystem;

	}

	async services(): Promise<httpResponse>{

		const services = await webHttpMethods.services(this);

		this.httpResponseCheck(services);

		return services;

	}

	async greenScreen(): Promise<httpResponse>{

		const greenScreen = await webHttpMethods.greenScreen(this);

		this.httpResponseCheck(greenScreen);

		return greenScreen;

	}

	async retrieveImageFromUrlAndSaveIt(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		const version = await webHttpMethods.retrieveImageFromUrlAndSaveIt(this, camera, file);

		this.httpResponseCheck(version);

		return version;

	}

	async retrieveDataFileFromIP(ip: string, id: string, file: EventEngineMedia): Promise<httpResponse>{

		const retrieveDataFileFromIP = await webHttpMethods.retrieveDataFileFromIP(this, ip, id, file);

		this.httpResponseCheck(retrieveDataFileFromIP);

		return retrieveDataFileFromIP;

	}

	async saveImage(file: EventEngineMedia, base64: string): Promise<httpResponse>{

		const saveImage = await webHttpMethods.saveImage(this, file, base64);

		this.httpResponseCheck(saveImage);

		return saveImage;

	}

	async doesFileExist(file: EventEngineMedia): Promise<httpResponse>{

		const doesFileExist = await webHttpMethods.doesFileExist(this, file);

		this.httpResponseCheck(doesFileExist);

		return doesFileExist;

	}

	async writeTextFileInSession(id: string, file: EventEngineMedia, text: string): Promise<httpResponse>{

		const writeTextFileInSession = await webHttpMethods.writeTextFileInSession(this, id, file, text);

		this.httpResponseCheck(writeTextFileInSession);

		return writeTextFileInSession;

	}

	async writeTextFile(file: EventEngineMedia, text: string): Promise<httpResponse>{

		const writeTextFile = await webHttpMethods.writeTextFile(this, file, text);

		this.httpResponseCheck(writeTextFile);

		return writeTextFile;

	}

	async copyFile(source: EventEngineMedia, destination: EventEngineMedia): Promise<httpResponse>{

		const copyFile = await webHttpMethods.copyFile(this, source, destination);

		this.httpResponseCheck(copyFile);

		return copyFile;

	}

	async deleteSession(id: string): Promise<httpResponse>{

		const deleteSession = await webHttpMethods.deleteSession(this, id);

		this.httpResponseCheck(deleteSession);

		return deleteSession;

	}

	async deleteFilesInSession(id: string, files: string): Promise<httpResponse>{

		const deleteFilesInSession = await webHttpMethods.deleteFilesInSession(this, id, files);

		this.httpResponseCheck(deleteFilesInSession);

		return deleteFilesInSession;

	}

	async produceVideoWithImages(data: string): Promise<httpResponse>{

		const produceVideoWithImages = await webHttpMethods.produceVideoWithImages(this, data);

		this.httpResponseCheck(produceVideoWithImages);

		return produceVideoWithImages;

	}

	async produceVideo(data: string): Promise<httpResponse>{

		const produceVideo = await webHttpMethods.produceVideo(this, data);

		this.httpResponseCheck(produceVideo);

		return produceVideo;

	}

}
