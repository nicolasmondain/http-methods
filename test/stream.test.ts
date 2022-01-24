import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {Camera} from '../src/class/camera';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import httpStatus from '@sharingbox/http-status/dist/browser';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const CAMERA_TYPE:string = process.env.CAMERA || 'WEBCAM';
const CAMERA             = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe(`stream ${CAMERA_TYPE}`, function stream(){

	this.slow(0); // eslint-disable-line no-invalid-this

	const camera:Camera = new Camera(CAMERA.SERVER, CAMERA.OPTIONS);

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('areYouHere should be fulfilled (httpStatus.isOK)', (done) => {

			camera.areYouHere()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('version should return a specific string', () => {

			camera.version()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					const version = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/u;

					chai.expect(response.data).to.be.a('string');
					chai.expect(response.data).to.match(version);

				}

			});

		});

		it('getCameraList should return an object', () => {

			camera.getCameraList()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					chai.expect(response.data).to.be.an('object');

				}

			});

		});

	});

});
