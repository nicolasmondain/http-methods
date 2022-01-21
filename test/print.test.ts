import {httpResponse} from '@sharingbox/http-status/src/@types/http-status';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import file from './file.test';
import httpPrint from '../src/print/print-http';
import httpStatus from '@sharingbox/http-status/dist/browser';
import {Printer} from '../src/class/printer';
import printers from './printers.test';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const PRINTER_TYPE:string = process.env.CAMERA || 'WEBCAM';
const PRINTER             = printers[PRINTER_TYPE] || printers.WEBCAM;

describe('print', function print(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context('standard HTTP calls with the correct parameters', () => {

		it('morePrints should be fulfilled (httpStatus.isOK)', (done) => {

			httpPrint.morePrints(PRINTER, file, 1)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					done();

				}

			});

		});


		it('numberOfLeftPrintSheets should be fulfilled (httpStatus.isOK) & return a number', () => {

			httpPrint.numberOfLeftPrintSheets(PRINTER)
			.then((response: httpResponse) => {

				if(httpStatus.isOK(response.status)){

					response.data.should.be.a('number');

				}

			});

		});

	});

	context('standard HTTP calls with the correct parameters (class instantiation)', () => {

		// If you have dynamic properties you want to access then use the any type to bypass type checks for the variable.
		// You can either declare the variable with the any type from the get go, or use the type assertion operator (as) at some later point.
		// So here are some possible variants:

		// var car: any = new domain.Entity(...);
		// car.model();

		// var car = new domain.Entity(...) as any;
		// car.model();

		// var car = new domain.Entity(...);
		// (car as any).model();

		const printer:any = new Printer(PRINTER);

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
