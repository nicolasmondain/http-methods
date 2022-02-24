import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';

export class CameraEos extends Camera{

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super('CameraEos', server, camera);

	}

}
