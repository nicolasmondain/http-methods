import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';

export class CameraWebcam extends Camera{

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super('CameraWebcam', server, camera);

	}

}
