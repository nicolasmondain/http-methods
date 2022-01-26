import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {Camera} from '../src/class/camera';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import file from './file.test';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Photobooth} from '../src/class/photobooth';
import photobooths from './photobooths.test';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const PHOTOBOOTH_TYPE:string = process.env.PHOTOBOOTH || 'LOCAL';
const PHOTOBOOTH             = photobooths[PHOTOBOOTH_TYPE] || photobooths.LOCAL;
const CAMERA_TYPE:string     = process.env.CAMERA || 'WEBCAM';
const CAMERA                 = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe('print', function print(){

	this.slow(0); // eslint-disable-line no-invalid-this

	const photobooth:Photobooth = new Photobooth(PHOTOBOOTH.SERVER);
	const camera:Camera         = new Camera(CAMERA.SERVER, CAMERA.OPTIONS);

	context('standard HTTP calls with the correct parameters', () => {

		it('retrieveImageFromUrlAndSaveIt should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.retrieveImageFromUrlAndSaveIt(camera, file)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

	});

});
