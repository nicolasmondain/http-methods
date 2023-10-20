import 'jsdom-global/register';

import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import {Camera} from '../src/class/camera';
import cameras from './cameras.test';
import chaiAsPromised from 'chai-as-promised';
import file from './file.test';
import httpStatus from '@sharingbox/http-status/dist/browser';
import params from './params.test';
import {Photobooth} from '../src/class/photobooth';
import photobooths from './photobooths.test';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const PHOTOBOOTH_TYPE:string = process.env.PHOTOBOOTH || 'LOCAL';
const PHOTOBOOTH             = photobooths[PHOTOBOOTH_TYPE] || photobooths.LOCAL;
const CAMERA_TYPE:string     = process.env.CAMERA || 'WEBCAM';
const CAMERA                 = cameras[CAMERA_TYPE] || cameras.WEBCAM;

describe('web', function web(){ // eslint-disable-line max-lines-per-function

	this.slow(0); // eslint-disable-line no-invalid-this

	const photobooth:Photobooth = new Photobooth(PHOTOBOOTH.SERVER);
	const camera:Camera         = new Camera(CAMERA.TYPE, CAMERA.SERVER, CAMERA.OPTIONS);

	context('standard HTTP calls with the correct parameters', () => {

		it('whatMode should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.whatMode()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('appDirectory should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.appDirectory()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('services should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.services()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('retrieveImageFromUrlAndSaveIt should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.retrieveImageFromUrlAndSaveIt(camera, file)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('greenScreen should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.greenScreen()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

	});

	context('initialization (init())', () => {

		it('init promises should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.init(params)
			.then(() => {

				done();

			})
			.catch((error: Error) => {

				console.log(error); // eslint-disable-line no-console

			});

		});

	});

	context('check utils methods', () => {

		it('addCamera, hasCamera methods should return specific values (number, boolean)', () => {

			const index1 = photobooth.addCamera(CAMERA.SERVER, CAMERA.OPTIONS);
			const index2 = photobooth.addCamera(CAMERA.SERVER, CAMERA.OPTIONS);
			const hasCam = photobooth.hasCamera();

			chai.expect(index1).to.be.a('number');
			chai.expect(index2).to.be.a('number');
			chai.expect(hasCam).to.be.a('boolean');

			chai.expect(hasCam).to.be.equal(true);

		});

		it('multiplecall should be fulfilled (httpStatus.isOK)', (done) => {

			photobooth.multiplecall(photobooth.log, [['string1'], ['string2']])
			.then(() => {

				photobooth.multiplecall(photobooth.copyFile, [[file, file], [file, file]])
				.then(() => {

					done();

				});

			});

		});

	});

});
