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

describe(`stream-settings ${CAMERA_TYPE}`, function streamSettings(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('changeOrientation should be fulfilled (httpStatus.isOK)', (done) => {

			httpStream.changeOrientation(CAMERA, 'Default')
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('getAvailableIso should return a number', () => {

			httpStream.getAvailableIso(CAMERA).then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.a('number');

				}

			});

		});

		it('getAvailableWb should return a number', () => {

			httpStream.getAvailableWb(CAMERA).then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.a('string');

				}

			});

		});

		it('getAvailableTv should return a number', () => {

			httpStream.getAvailableTv(CAMERA).then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.a('string');

				}

			});

		});

		it('getFrameSizes should return an array', () => {

			httpStream.getFrameSizes(CAMERA).then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.an('array');

				}

			});

		});

	});

});