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

describe(`stream-greenscreen ${CAMERA_TYPE}`, function streamGreenscreen(){

	this.slow(0); // eslint-disable-line no-invalid-this

	const camera:Camera = new Camera(CAMERA.TYPE, CAMERA.SERVER, CAMERA.OPTIONS);

	context(`standard HTTP calls with the correct parameters ${CAMERA_TYPE}`, () => {

		it('greenscreenOff should be fulfilled (httpStatus.isOK)', (done) => {

			camera.greenscreenOff()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

	});

});
