import {EventEngineServer, EventEngineStream} from '../@types/event-engine';
import {Camera} from './camera';

export class CameraEos extends Camera{

	type: string;

	constructor(server: EventEngineServer, camera: EventEngineStream){

		super(server, camera);

		this.type = 'eos';

	}

}