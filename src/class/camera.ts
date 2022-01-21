import {EventEngineStream} from '../@types/event-engine';
import {Hardware} from './hardware';
import streamHttpMethods from '../stream/stream-http';

export class Camera extends Hardware {

	constructor(options: EventEngineStream){

		super(options, streamHttpMethods);

	}

}
