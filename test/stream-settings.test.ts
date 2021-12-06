import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStream from '../src/stream/stream-http';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe(`stream-settings ${CAMERA_TYPE}`, function streamSettings(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('changeOrientation should be fulfilled (httpStatus.isOK)', () => httpStream.changeOrientation(CAMERA, 'Default').should.be.fulfilled);

		it('getAvailableIso should return a number', () => {

			httpStream.getAvailableIso(CAMERA).then((response: httpResponse) => {

				chai.expect(response.data).to.be.a('number');

			});

		});

		it('getAvailableWb should return a number', () => {

			httpStream.getAvailableWb(CAMERA).then((response: httpResponse) => {

				chai.expect(response.data).to.be.a('string');

			});

		});

		it('getAvailableTv should return a number', () => {

			httpStream.getAvailableTv(CAMERA).then((response: httpResponse) => {

				chai.expect(response.data).to.be.a('string');

			});

		});

		it('getFrameSizes should return a number', () => {

			httpStream.getFrameSizes(CAMERA).then((response: httpResponse) => {

				chai.expect(response.data).to.be.an('array');

			});

		});

	});

});
