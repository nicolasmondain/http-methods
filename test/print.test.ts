import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import httpPrint from '../src/print/print-http';

import 'mocha';

chai.use(chaiAsPromised);
chai.should();

const SERVER = 'http://localhost:8080';

describe('print', function print(){

	this.slow(0); // eslint-disable-line no-invalid-this

	context('standard HTTP calls with the correct parameters', () => {

		it('morePrints should be fulfilled (httpStatus.isOK)', () => httpPrint.morePrints(SERVER).should.be.fulfilled);
		it('numberOfLeftPrintSheets should be fulfilled (httpStatus.isOK) & return a number', () => httpPrint.numberOfLeftPrintSheets(SERVER).should.eventually.be.a('number'));

	});

});
