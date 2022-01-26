import {EventEngineMedia, EventEngineServer} from '../@types/event-engine';

import {Camera} from './camera';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Server} from './server';
import webHttpMethods from '../web/web-http';

export class Photobooth extends Server{

	constructor(server: EventEngineServer){

		super(server);

	}

	async retrieveImageFromUrlAndSaveIt(camera: Camera, file: EventEngineMedia): Promise<httpResponse>{

		const version = await webHttpMethods.retrieveImageFromUrlAndSaveIt(this, camera, file);

		return version;

	}

}
