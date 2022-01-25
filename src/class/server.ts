import {EventEngineServer, EventEngineServerExpectations} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import httpStatus from '@sharingbox/http-status/dist/browser';

export class Server {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	constructor(options: EventEngineServer){

		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = `${options.protocol}://${options.server}:${options.port}`;

	}

	recall(loop: (args: Array<any>) => Promise<httpResponse>, args: Array<any>, expect: EventEngineServerExpectations): Promise<httpResponse>{ // eslint-disable-line no-unused-vars, max-lines-per-function

		const RECALL_DELAY    = 250;
		const RECALL_MAX      = 50;
		const RECALL_INIT     = 0;
		const RECALL_ASKED    = 1;
		const RECALL_ANSWERED = 2;

		let count  = 0;
		let status = RECALL_INIT;

		return new Promise((resolve, reject) => {

			const interval = setInterval(() => {

				if(status === RECALL_INIT || status === RECALL_ANSWERED){

					count += 1;
					status = RECALL_ASKED;

					try{

						loop.bind(this)(args)
						.then((response) => {

							const checkResponseData = httpStatus.checkResponseData(response);

							const expectations = expect
																	.expectations
																	.map((e) => checkResponseData.expect(e.nested)[e.method](e.compare))
																	.every((e) => e === true);

							if(response.status === expect.status && expectations === true){

								clearInterval(interval);
								resolve(response);

							}else if(count >= RECALL_MAX){

								clearInterval(interval);
								reject(new Error(JSON.stringify(response)));

							}else{

								status = RECALL_ANSWERED;

							}

						})
						.catch((error) => {

							clearInterval(interval);
							reject(error);

						});

					}catch(error){

						clearInterval(interval);
						reject(error);

					}

				}

			}, RECALL_DELAY);

		});

	}

}
