import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Server} from './server';
import streamHttpMethods from '../stream/stream-http';

export class CameraIos extends Camera{

	type: string;

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super(server, camera);

		this.type = 'ios';

	}

	async setSlowmotion(): Promise<httpResponse>{

		const SLOWMOTION_FRAMERATE = 120;

		const setSlowmotion = await streamHttpMethods.setSlowmotion(this, SLOWMOTION_FRAMERATE);

		Server.httpResponseCheck(setSlowmotion);

		return setSlowmotion;

	}

}
