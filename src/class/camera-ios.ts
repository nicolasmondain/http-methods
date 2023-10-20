import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import streamHttpMethods from '../stream/stream-http';

export class CameraIos extends Camera{

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super('CameraIos', server, camera);

	}

	async setSlowmotion(): Promise<httpResponse>{

		const SLOWMOTION_FRAMERATE = 120;

		const setSlowmotion = await streamHttpMethods.setSlowmotion(this, SLOWMOTION_FRAMERATE);

		this.httpResponseCheck(setSlowmotion);

		return setSlowmotion;

	}

	async setOrientation(orientation: string): Promise<httpResponse>{

		const setOrientation = await streamHttpMethods.setOrientation(this, orientation);

		this.httpResponseCheck(setOrientation);

		return setOrientation;

	}

}
