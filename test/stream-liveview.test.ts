import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {AxiosError} from 'axios';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStatus from '@sharingbox/http-status/dist/browser';
import httpStream from '../src/stream/stream-http';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

const DELAY_BETWEEN_STARTLIVEVIEW_AND_GETLIVEFEEDSTATUS = 2000;
const DELAY_MAX_FOR_LIVEFEED_ANALYSIS                   = 5000;

describe(`stream-liveview ${CAMERA_TYPE}`, function streamLiveview(){ // eslint-disable-line max-lines-per-function

	this.slow(0); // eslint-disable-line no-invalid-this
	this.timeout(DELAY_MAX_FOR_LIVEFEED_ANALYSIS); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('startLiveView should be fulfilled (httpStatus.isOK)', (done) => {

			httpStream.startLiveView(CAMERA)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('stopLiveView should be fulfilled (httpStatus.isOK)', (done) => {

			httpStream.stopLiveView(CAMERA)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('getLivefeedAsImage should return a string', (done) => {

			httpStream.getLivefeedAsImage(CAMERA)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

	});

	context(`getLivefeedStatus analysis ${CAMERA_TYPE}`, () => { // eslint-disable-line max-lines-per-function

		it('getLivefeedStatus should be rejected if livefeed is off', (done) => {

			httpStream.stopLiveView(CAMERA)
			.then((response: httpResponse)  => new Promise<void>((resolve, reject) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				httpStream.getLivefeedStatus(CAMERA)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status) === false){

						done();

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				});

			}))
			.catch(() => {

				done();

			});

		});

		it('getLivefeedStatus should return an object (status: "success") if livefeed is on', (done) => {

			httpStream.startLiveView(CAMERA)
			.then((response: httpResponse) => new Promise<void>((resolve, reject) => {

				if(httpStatus.isOK(response.status)){

					setTimeout(() => {

						resolve();

					}, DELAY_BETWEEN_STARTLIVEVIEW_AND_GETLIVEFEEDSTATUS);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				httpStream.getLivefeedStatus(CAMERA)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						httpStream.stopLiveView(CAMERA).then(() => {

							done();

						});

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				});

			}))
			.catch((e: AxiosError) => {

				let error = e;

				if(error.isAxiosError && error.response){

					error = httpStatus.formatResponse(error.response.status, error.response.statusText, error.response.data);

				}

				console.log(error);

			});

		});

	});

});
