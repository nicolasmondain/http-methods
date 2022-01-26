import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import file from './file.test';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Printer} from '../src/class/printer';
import printers from './printers.test';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const PRINTER_TYPE:string = process.env.PRINTER || 'DNP';
const PRINTER             = printers[PRINTER_TYPE] || printers.DNP;

describe('print', function print(){

	this.slow(0); // eslint-disable-line no-invalid-this

	const printer:Printer = new Printer(PRINTER.SERVER, PRINTER.OPTIONS);

	context('standard HTTP calls with the correct parameters', () => {

		it('morePrints should be fulfilled (httpStatus.isOK)', (done) => {

			printer.morePrints(file, 1)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});

		it('numberOfLeftPrintSheets should be fulfilled (httpStatus.isOK) & return a number', () => {

			printer.numberOfLeftPrintSheets()
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					response.data.should.be.a('number');

				}

			});

		});

	});

});
