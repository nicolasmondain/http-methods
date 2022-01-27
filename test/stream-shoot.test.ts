/* eslint-disable max-lines-per-function */

import {EventEngineServerExpectations} from '../src/@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {AxiosError} from 'axios';
import {Camera} from '../src/class/camera';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import file from './file.test';
import httpStatus from '@sharingbox/http-status/dist/browser';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

const SECOND = 1000;
const DELAY_BETWEEN_STARTLIVEVIEW_AND_SHOOT           = CAMERA_TYPE === 'WEBCAM' ? SECOND : 0;
const DELAY_BETWEEN_SHOOT_AND_GETAVAILABLESTREAMCOUNT = CAMERA_TYPE === 'WEBCAM' ? 0 : SECOND; // eslint-disable-line
const DELAY_MAX_FOR_COMPLETE_SHOOT_PROCESS            = 10000;

describe(`stream-shoot ${CAMERA_TYPE}`, function streamShoot(){

	this.slow(0); // eslint-disable-line no-invalid-this
	this.timeout(DELAY_MAX_FOR_COMPLETE_SHOOT_PROCESS); // eslint-disable-line no-invalid-this

	const camera:Camera = new Camera(CAMERA.SERVER, CAMERA.OPTIONS);

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

		it('cancelPending should be fulfilled (httpStatus.isOK)', (done) => {

			camera.cancelPending()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('getAvailableFilestreamCount should return a number', () => {

			camera.getAvailableFilestreamCount()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.a('number');

				}

			});

		});

		it('getLastShootErrorMessage should return a object', () => {

			camera.getLastShootErrorMessage()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.an('object');

				}

			});

		});

	});

	context(`complete shoot process ${CAMERA_TYPE}`, () => {

		it('startLiveView > shootAndWait > getAvailableFilestreamCount > writePictureStreamToFile > deleteFile > stopLiveView', (done) => {

			camera.startLiveView()
			.then((response: httpResponse) => new Promise<void>((resolve, reject) => {

				if(httpStatus.isOK(response.status)){

					setTimeout(() => {

						resolve();

					}, DELAY_BETWEEN_STARTLIVEVIEW_AND_SHOOT);

				}else{

					reject(new Error(JSON.stringify(response)));

				}

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				camera.shootAndWait(file)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						resolve();

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				});

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				const expect:EventEngineServerExpectations = [

					{
						status : 200,
						method : 'toBeGreaterThan',
						nested : '',
						compare: 0
					}

				];

				camera.recall(camera.getAvailableFilestreamCount, [], expect)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status) && typeof response.data === 'number'){

						chai.expect(response.data).to.equal(1);

						resolve();

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				})
				.catch((e: AxiosError) => {

					let error = e;

					if(error.isAxiosError && error.response){

						error = httpStatus.formatResponse(error.response.status, error.response.statusText, error.response.data);

					}

					console.log(error); // eslint-disable-line no-console

					process.exit();

				});

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				camera.writePictureStreamToFile(file)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						resolve();

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				});

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				camera.stopLiveView()
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						resolve();

					}else{

						reject(new Error(JSON.stringify(response)));

					}

				});

			}))
			.then(() => new Promise<void>((resolve, reject) => {

				camera.deleteFile(file)
				.then((response: httpResponse) => {

					if(httpStatus.isOK(response.status)){

						done();

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
