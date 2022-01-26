/* eslint-disable no-unused-vars */

import {EventEnginePrinter, EventEngineServer, EventEngineStream} from '../event-engine';

export type httpMethodsModule = Record<string, void|Promise>;

export interface CameraClassParams {

	SERVER : EventEngineServer;
	OPTIONS: EventEngineStream;

}

export interface PrinterClassParams {

	SERVER : EventEngineServer;
	OPTIONS: EventEnginePrinter;

}

export interface PhotoboothClassParams {

	SERVER : EventEngineServer;

}
