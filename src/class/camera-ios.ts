import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';

export class CameraIos extends Camera{

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super(server, camera);

	}

}
