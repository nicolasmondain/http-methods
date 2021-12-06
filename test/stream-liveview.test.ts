import {getLivefeedStatusResponse} from '../src/@types/http-methods';

import * as chai from 'chai';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStream from '../src/stream/stream-http';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe(`stream-liveview ${CAMERA_TYPE}`, function streamLiveview(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('startLiveView should be fulfilled (httpStatus.isOK)', () => httpStream.startLiveView(CAMERA).should.be.fulfilled);
		it('stopLiveView should be fulfilled (httpStatus.isOK)', () => httpStream.stopLiveView(CAMERA).should.be.fulfilled);
		it('getLivefeedAsImage should return a string', () => httpStream.getLivefeedAsImage(CAMERA).should.be.a('string'));

	});

	context(`getLivefeedStatus analysis ${CAMERA_TYPE}`, () => {

		it('getLivefeedStatus should be rejected if livefeed is off', () => {

			httpStream.stopLiveView(CAMERA).then(() => httpStream.getLivefeedStatus(CAMERA).should.be.rejected);

		});

		it('getLivefeedStatus should return an object (status: "success") if livefeed is on', () => {

			httpStream.startLiveView(CAMERA)
			.then(() => httpStream.getLivefeedStatus(CAMERA))
			.then((response: getLivefeedStatusResponse) => {

				httpStream.stopLiveView(CAMERA);
				chai.expect(response.status).to.equal('success');

			});

		});

	});

});
