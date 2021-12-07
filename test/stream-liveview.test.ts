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

describe(`stream-liveview ${CAMERA_TYPE}`, function streamLiveview(){

	this.slow(0); // eslint-disable-line no-invalid-this
	this.timeout(DELAY_MAX_FOR_LIVEFEED_ANALYSIS); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('startLiveView should be fulfilled (httpStatus.isOK)', () => httpStream.startLiveView(CAMERA).should.be.fulfilled);
		it('stopLiveView should be fulfilled (httpStatus.isOK)', () => httpStream.stopLiveView(CAMERA).should.be.fulfilled);
		it('getLivefeedAsImage should return a string', () => httpStream.getLivefeedAsImage(CAMERA).should.be.a('string'));

	});

	context(`getLivefeedStatus analysis ${CAMERA_TYPE}`, () => {

		it('getLivefeedStatus should be rejected if livefeed is off', () => {

			httpStream.stopLiveView(CAMERA).then(() => httpStream.getLivefeedStatus(CAMERA).should.be.rejected);

		});

		it('getLivefeedStatus should return an object (status: "success") if livefeed is on', (done) => {

			httpStream.startLiveView(CAMERA)
			.then(() => new Promise<void>((resolve) => {

				setTimeout(() => {

					resolve();

				}, DELAY_BETWEEN_STARTLIVEVIEW_AND_GETLIVEFEEDSTATUS);

			}))
			.then(() => httpStream.getLivefeedStatus(CAMERA))
			.then((_getLivefeedStatus: httpResponse) => {

				chai.expect(_getLivefeedStatus.data.status).to.equal('success');

				httpStream.stopLiveView(CAMERA).then(() => {

					done();

				});

			})
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
