import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {AxiosError} from 'axios';
import {Camera} from '../src/class/camera';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStatus from '@sharingbox/http-status/dist/browser';

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

	const camera:Camera = new Camera(CAMERA.TYPE, CAMERA.SERVER, CAMERA.OPTIONS);

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('startLiveView should be fulfilled (httpStatus.isOK)', (done) => {

			camera.startLiveView()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('stopLiveView should be fulfilled (httpStatus.isOK)', (done) => {

			camera.stopLiveView()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('getLivefeedAsImage should return a string', () => {

			const livefeedURL = camera.getLivefeedAsImage();

			chai.expect(livefeedURL).to.be.a('string');

		});

	});

	context(`getLivefeedStatus analysis ${CAMERA_TYPE}`, () => { // eslint-disable-line max-lines-per-function

		it('getLivefeedStatus should be rejected if livefeed is off', (done) => {

			camera.stopLiveView()
			.then((response: httpResponse)  => new Promise<void>((resolve, reject) => {

				if(httpStatus.isOK(response.status)){

					resolve();

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			}))
			.then(() => camera.getLivefeedStatus())
			.catch(() => {

				done();

			});

		});

		it('getLivefeedStatus should return an object (status: "success") if livefeed is on', (done) => {

			camera.startLiveView()
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

				camera.getLivefeedStatus()
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						camera.stopLiveView().then(() => {

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

				console.log(error); // eslint-disable-line no-console

				process.exit();

			});

		});

	});

});
