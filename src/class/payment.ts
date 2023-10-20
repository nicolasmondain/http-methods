import {EventEnginePayment, EventEngineServer} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import paymentHttpMethods from '../payment/payment-http';
import {Server} from './server';

const STRIPE_PROTOCOL = 'https';
const STRIPE_SERVER   = 'stripe.sharingbox.com/api';

export class Payment extends Server{

	simulate: EventEnginePayment['simulate'];
	qrcode  : EventEnginePayment['qrcode'];

	constructor(server: EventEngineServer, payment: EventEnginePayment){

		if(payment.qrcode){

			server.protocol = STRIPE_PROTOCOL;
			server.server   = STRIPE_SERVER;
			server.port     = 0;

		}

		super('Payment', server);

		this.simulate = payment.simulate;
		this.qrcode   = payment.qrcode;

	}

	async code(scan: string, options = {idFTPevent: '', idSession: '', idBox: 0}): Promise<httpResponse>{

		const code = await paymentHttpMethods.code(this, scan, options);

		this.httpResponseCheck(code);

		return code;

	}

	async cancelSession(): Promise<httpResponse>{

		const cancelSession = await paymentHttpMethods.cancelSession(this);

		this.httpResponseCheck(cancelSession);

		return cancelSession;

	}

}
