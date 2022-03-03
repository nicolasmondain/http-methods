import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';

import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import streamHttpMethods from '../stream/stream-http';

export class CameraEos extends Camera{

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super('CameraEos', server, camera);

	}

	async setRecordingModeOn(): Promise<httpResponse>{

		const setRecordingModeOn = await streamHttpMethods.setRecordingModeOn(this);

		this.httpResponseCheck(setRecordingModeOn);

		return setRecordingModeOn;

	}

	async setRecordingModeOff(): Promise<httpResponse>{

		const setRecordingModeOff = await streamHttpMethods.setRecordingModeOff(this);

		this.httpResponseCheck(setRecordingModeOff);

		return setRecordingModeOff;

	}

}
