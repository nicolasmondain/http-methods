import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import httpPrint from '../src/print/print-http';
import httpStatus from '@sharingbox/http-status/dist/browser';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const SERVER = 'http://localhost:8080';

describe('print', function print(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context('standard HTTP calls with the correct parameters', () => {

		it('morePrints should be fulfilled (httpStatus.isOK)', (done) => {

			httpPrint.morePrints(SERVER)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});


		it('numberOfLeftPrintSheets should be fulfilled (httpStatus.isOK) & return a number', () => {

			httpPrint.numberOfLeftPrintSheets(SERVER)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					response.data.should.be.a('number');

				}

			});

		});

	});

});
