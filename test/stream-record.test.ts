import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStatus from '@sharingbox/http-status/dist/browser';
import httpStream from '../src/stream/stream-http';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe(`stream-record ${CAMERA_TYPE}`, function streamRecord(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('stopRecording should be fulfilled (httpStatus.isOK)', (done) => {

			httpStream.stopRecording(CAMERA)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

	});

});